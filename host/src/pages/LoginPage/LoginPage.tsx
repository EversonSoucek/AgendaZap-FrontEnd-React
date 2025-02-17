import "./LoginPage.css";
import calendario from "../../assets/Timeline-rafiki (2) 1.png";
import { Input } from "../../components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import { BotaoLink } from "../../components/BotaoLink/BotaoLink";
import { FaUserCircle } from "react-icons/fa";
import { Logo } from "../../components/Logo/Logo";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NotFoundPage } from "../NotFoundPage/NotFoundPage";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";

export default function LoginPage() {
    const { idEmpresa } = useParams<{ idEmpresa: string }>();
    const navigate = useNavigate();
    const [empresaExiste, setEmpresaExiste] = useState<boolean | null>(null);

    useEffect(() => {
        if (idEmpresa) {
            const verificaEmpresa = async () => {
                const existe = await UseVerificaEmpresa(idEmpresa); // Esperar pela verificação
                setEmpresaExiste(existe);

                if (!existe) {
                    navigate("/notfound");
                }
            };

            verificaEmpresa(); // Chama a função de verificação
        }
    }, [idEmpresa, navigate]);

    if (empresaExiste === null) {
        return null; // Enquanto estiver verificando, não renderiza nada
    }

    if (!empresaExiste) {
        return <NotFoundPage />; // Se a empresa não existir, renderiza a página de erro
    }

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
                        <form className="login__form">
                            <Logo />
                            <div className="login__form__logar">
                                <Input placeholder="Login" tipo="text" />
                                <Input placeholder="Senha" tipo="password" />
                                <Link className="login__form__esqueci-senha" to={"/:idEmpresa/esqueciSenha"}>
                                    Esqueci minha senha
                                </Link>
                                <BotaoLink url="/:idEmpresa/home">Entrar</BotaoLink>
                            </div>
                        </form>
                    </div>
                </div>
                <div dangerouslySetInnerHTML={{ __html: "<!-- https://storyset.com/event>Event illustrations by Storyset -->" }} />
            </div>
        </div>
    );
}
