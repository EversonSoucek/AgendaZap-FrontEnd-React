import { Link, useNavigate } from 'react-router-dom';
import { useErrorBoundary } from 'react-error-boundary';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Logo } from '../../Logo/Logo';
import api from '../../../services/api';

import {
    LoginUsuarioSchema,
    LoginUsuarioSchemaType,
} from "../../../schema/LoginUsuarioSchema";

import "./LoginForm.css";
import { Stack, TextField } from '@mui/material';

export const LoginFormUsuario = ({ idEmpresa }: { idEmpresa: string | undefined }) => {

    const navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginUsuarioSchemaType>({
        resolver: zodResolver(LoginUsuarioSchema),
        defaultValues: {
            nomeUsuario: "",
            senha: "",
        },
    });

    const onSubmit = async (data: LoginUsuarioSchemaType) => {
        try {
            const response = await api(`${idEmpresa}/autentificacao`, "POST", data);

            if (response.status === 200) {
                const body = await response.json();

                // 🔥 Salvar token no localStorage
                localStorage.setItem("accessToken", body.accessToken);


                return navigate(`/${idEmpresa}/home`);
            }

            if (response.status === 401 || response.status === 404) {
                setError("nomeUsuario", { message: "Nome de usuário ou senha incorreta" });
                setError("senha", { message: " " });
            }

            if (response.status === 400) {
                setError("nomeUsuario", { message: "Usuário foi desativado" });
                setError("senha", { message: " " });
            }
        }
        catch (error) {
            showBoundary(error);
        }
    };

    return (
        <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <Logo />

            <div className="login__form__logar">
                <Stack flexDirection='column' spacing={2}>
                    <TextField
                        label="Login"
                        {...register("nomeUsuario")}
                        error={!!errors.nomeUsuario}
                        helperText={errors.nomeUsuario?.message}
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                backgroundColor: "#424D6F",
                                color: "#fff",
                                height: "34px",

                                "& fieldset": {
                                    borderColor: "#7B8090",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#7B8090",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#7B8090",
                                },
                            },

                            "& .MuiInputBase-input::placeholder": {
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                color: "#BCBCBC",
                                fontStyle: "italic",
                            },

                            "& .MuiInputLabel-root": {
                                color: "#BCBCBC",
                                fontStyle: "italic",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#BCBCBC",
                            },

                            "@media (max-width: 768px)": {
                                "& .MuiOutlinedInput-root": {
                                    width: "167px",
                                },
                            },

                            "@media (max-width: 390px)": {
                                "& .MuiOutlinedInput-root": {
                                    width: "90px",
                                },
                            },

                            "@media (max-width: 475px)": {
                                "& .MuiOutlinedInput-root": {
                                    width: "100%",
                                    color: "#818181",
                                    backgroundColor: "#fff",
                                },
                            },
                        }}
                    />
                    <TextField
                        label="Senha"
                        type="password"
                        {...register("senha")}
                        error={!!errors.senha}
                        helperText={errors.senha?.message}
                        fullWidth
                        size="small"
                        variant="outlined"
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: "10px",
                                backgroundColor: "#424D6F",
                                color: "#fff",
                                height: "34px",

                                "& fieldset": {
                                    borderColor: "#7B8090",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#7B8090",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#7B8090",
                                },
                            },

                            "& .MuiInputBase-input::placeholder": {
                                fontFamily: "Poppins",
                                fontSize: "14px",
                                color: "#BCBCBC",
                                fontStyle: "italic",
                            },

                            "& .MuiInputLabel-root": {
                                color: "#BCBCBC",
                                fontStyle: "italic",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#BCBCBC",
                            },

                            "@media (max-width: 768px)": {
                                "& .MuiOutlinedInput-root": {
                                    width: "167px",
                                },
                            },

                            "@media (max-width: 390px)": {
                                "& .MuiOutlinedInput-root": {
                                    width: "90px",
                                },
                            },

                            "@media (max-width: 475px)": {
                                "& .MuiOutlinedInput-root": {
                                    width: "100%",
                                    color: "#818181",
                                    backgroundColor: "#fff",
                                },
                            },
                        }}
                    />

                    <Link
                        className="login__form__esqueci-senha"
                        to={`/${idEmpresa}/esqueciSenhaConfirma`}
                    >
                        Esqueci minha senha
                    </Link>
                </Stack>




                <button className="login__form__botao" type="submit">
                    Entrar
                </button>

            </div>
        </form>
    );
};
