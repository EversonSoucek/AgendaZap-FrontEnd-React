import calendario from "../../assets/Timeline-rafiki (2) 1.png";
import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import { FaUserCircle } from "react-icons/fa";
import { LoginLivro } from "../../components/Login/LoginLivro/LoginLivro";
import { ErrorBoundary } from "react-error-boundary";
import { TErrorFallBack } from "../../services/TErrorFallBack";
import { LoginFormUsuario } from "../../components/Login/LoginForm/LoginForm";
import "./LoginPage.css"

const ErrorFallback: React.FC<TErrorFallBack> = ({ error, resetErrorBoundary }) => {
    return (
        <div style={{ color: "red", fontSize: "0.875rem" }}>
            Algo deu errado:{error.message}
            <button onClick={resetErrorBoundary}>Tente novamente</button>
        </div>
    )
}

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
            <LoginLivro imagem={calendario} legenda="Duas pessoas cartunescas ajustando um calendário" >
                <ErrorBoundary FallbackComponent={ErrorFallback}>
                    <LoginFormUsuario idEmpresa={idEmpresa} />
                </ErrorBoundary>
            </LoginLivro>
            <div dangerouslySetInnerHTML={{ __html: "<!-- https://storyset.com/event>Event illustrations by Storyset -->" }} />
        </div >
    )
}
