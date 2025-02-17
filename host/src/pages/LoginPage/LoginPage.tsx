import "./LoginPage.css";
import calendario from "../../assets/Timeline-rafiki (2) 1.png";
import { Input } from "../../components/Input/Input";
import { Link } from "react-router-dom";
import { BotaoLink } from "../../components/BotaoLink/BotaoLink";
import { FaUserCircle } from "react-icons/fa";
import { Logo } from "../../components/Logo/Logo";
import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";

export default function LoginPage() {
    const { idEmpresa } = useParams<{ idEmpresa: string }>();

    if (idEmpresa) {
        UseVerificaEmpresa(idEmpresa);
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
