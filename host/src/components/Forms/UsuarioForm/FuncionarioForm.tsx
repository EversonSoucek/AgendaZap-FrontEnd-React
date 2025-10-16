import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Box,
    Button,
    Stack,
    TextField,
    Switch,
    FormControlLabel,
    Typography,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
} from "@mui/material";
import { useParams } from "react-router-dom";
import FuncionariosPresenter from "../../../presenters/FuncionariosPresenter";
import { Cargo } from "../../../enum/Cargo";
import { FuncionarioSchema, FuncionarioSchemaType } from "../../../schema/FuncionarioSchema";

type TFuncionarioFormProps = {
    funcionario?: FuncionariosPresenter;
};

export default function FuncionarioForm({ funcionario }: TFuncionarioFormProps) {
    const { idEmpresa } = useParams<{ idEmpresa: string }>();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FuncionariosPresenter>({
        resolver: zodResolver(FuncionarioSchema),
        defaultValues: new FuncionariosPresenter(), // inicia vazio
    });

    // 🔄 Atualiza o form quando o funcionário for carregado
    useEffect(() => {
        if (funcionario) {
            reset({
                ...funcionario,
                idEmpresa: idEmpresa ?? funcionario.idEmpresa,
            });
        } else {
            reset({
                ...new FuncionariosPresenter(),
                idEmpresa: idEmpresa ?? "",
            });
        }
    }, [funcionario, idEmpresa, reset]);

    const onSubmit = (data: FuncionarioSchemaType) => {
        if (funcionario) {
            console.log("Atualizando funcionário:", data);
            // Chamar seu useCase de update aqui
        } else {
            console.log("Criando novo funcionário:", data);
            // Chamar seu useCase de create aqui
        }
    };

    return (
        <Box maxWidth={600} mx="auto" mt={4}>
            <Typography variant="h5" mb={3}>
                {funcionario ? "Editar Funcionário" : "Adicionar Funcionário"}
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack spacing={2}>
                    <TextField
                        label="Nome de Usuário"
                        {...register("nomeUsuario")}
                        error={!!errors.nomeUsuario}
                        helperText={errors.nomeUsuario?.message}
                    />

                    <TextField
                        label="Nome Completo"
                        {...register("nomeInteiro")}
                        error={!!errors.nomeInteiro}
                        helperText={errors.nomeInteiro?.message}
                    />

                    <TextField
                        label="CPF"
                        {...register("cpf")}
                        error={!!errors.cpf}
                        helperText={errors.cpf?.message}
                    />

                    <TextField
                        label="Senha"
                        type="password"
                        {...register("senha")}
                        error={!!errors.senha}
                        helperText={errors.senha?.message}
                    />

                    <TextField
                        label="Email"
                        {...register("email")}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                    />

                    {/* Select de Cargo usando o enum */}
                    <FormControl fullWidth>
                        <InputLabel id="idCargo-label">Cargo</InputLabel>
                        <Select
                            labelId="idCargo-label"
                            defaultValue={funcionario?.idCargo ?? Cargo.USER}
                            {...register("idCargo", { valueAsNumber: true })}
                        >
                            {Object.entries(Cargo)
                                .filter(([_, v]) => typeof v === "number")
                                .map(([key, value]) => (
                                    <MenuItem key={value} value={value}>
                                        {key}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>

                    <FormControlLabel
                        control={<Switch {...register("statusUsuario")} />}
                        label="Ativo"
                    />

                    <Button variant="contained" type="submit">
                        Salvar
                    </Button>
                </Stack>
            </form>
        </Box>
    );
}
