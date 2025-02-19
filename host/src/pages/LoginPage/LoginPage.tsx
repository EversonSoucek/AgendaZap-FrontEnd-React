import "./LoginPage.css";
import calendario from "../../assets/Timeline-rafiki (2) 1.png";
import { Input } from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { BotaoLink } from "../../components/BotaoLink/BotaoLink";
import { FaUserCircle } from "react-icons/fa";
import { Logo } from "../../components/Logo/Logo";
import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import { useState } from "react";
import { TUsuarioLogin } from "../../types/TUsuarioLogin";

export default function LoginPage() {
    const { idEmpresa } = useParams<{ idEmpresa: string }>();
    let navigate = useNavigate();
    const [usuario, setUsuario] = useState<TUsuarioLogin>({
        nomeUsuario: "",
        senha: ""
    });

    if (idEmpresa) {
        UseVerificaEmpresa(idEmpresa);
    }

    const logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usuarioDado = usuario;
        console.log(usuario.nomeUsuario);
        console.log(usuario.senha);

        try {
            const response = await fetch(`http://localhost:5235/zapagenda/${idEmpresa}/autentificacao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(usuarioDado),
            });

            console.log(`Resposta: ${response.status}`);

            if (response.status === 200) {
                navigate("/home");
            } else if (response.status === 401) {
                console.log(`Resposta: ${response.status}`);
                window.alert("Credenciais inválidas ou senha incorreta.");
            } else if (response.status === 400) {
                window.alert("Usuário está desativado.");
            } else {
                window.alert("Erro desconhecido: " + response.status);
                console.log(`Resposta: ${response.status}`);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
            window.alert("Erro na comunicação com o servidor. Tente novamente.");
        }
    };

    const aoMudarInput = (e: React.ChangeEvent<HTMLInputElement>, campo: string) => {
        setUsuario({ ...usuario, [campo]: e.target.value });
    };

    return (
        <div className="fundo">
            <header className="cabecalho container">
                <div className="cabecalho__user">
                    <FaUserCircle size={37} />
                </div>
                <div className="cabecalho__texto">Login</div>
            </header>
            <div className="login">
                <div className="login__container container">
                    <div className="login__container__livro">
                        <div className="login__container__imagem">
                            <img
                                className="login__container__calendario-imagem"
                                alt="Duas pessoas cartunescas organizando um calendário"
                                src={calendario}
                            />
                        </div>
                        <form className="login__form" onSubmit={(e => logar(e))}>
                            <Logo />
                            <div className="login__form__logar">
                                <Input placeholder="Login" tipo="text" onChange={e => aoMudarInput(e, 'nomeUsuario')} />
                                <Input placeholder="Senha" tipo="password" onChange={e => aoMudarInput(e, 'senha')} />
                                <Link className="login__form__esqueci-senha" to={"/:idEmpresa/esqueciSenha"}>
                                    Esqueci minha senha
                                </Link>
                                <button type="submit">entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: "<!-- https://storyset.com/event>Event illustrations by Storyset -->" }} />
            </div>
        </div>
    );
}
