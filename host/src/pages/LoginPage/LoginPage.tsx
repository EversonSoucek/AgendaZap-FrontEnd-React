import "./LoginPage.css"
import calendario from "../../assets/Timeline-rafiki (2) 1.png"
import roboZapeando from "../../assets/ZapeandoBranco.png"
import { Input } from "../../components/Input/Input"
import { Link } from "react-router-dom"
import { BotaoLink } from "../../components/BotaoLink/BotaoLink"

export default function LoginPage() {
    //todo: colocar sombra
    return (
        <div className="login">
            <div className="login__container container">
                <div className="teste">
                    <div className="login__container__imagem">
                        <img alt="Duas pessoas cartunescas organizando um calendário" src={calendario} />
                    </div>
                    <form className="login__form">
                        <div className="login__form__logo">
                            <img alt="Robô com antenas sorrindo" className="login__form__logo--imagem" src={roboZapeando} />
                            <h1 className="login__form--titulo">AgendaZap</h1>
                        </div>
                        <div className="login__form__logar">
                            <Input placeholder="Login" tipo="text" />
                            <Input placeholder="Senha" tipo="password" />
                            <Link className="login__form__esqueciSenha" to={"/:idEmpresa/esqueciSenha"} > Esqueci minha senha</Link>
                            <BotaoLink url="/:idEmpresa/home">Entrar</BotaoLink>
                        </div>
                    </form>
                </div>
            </div>
            <div dangerouslySetInnerHTML={{ __html: "<!-- https://storyset.com/event>Event illustrations by Storyset -->" }} />
        </div>
    )
}
