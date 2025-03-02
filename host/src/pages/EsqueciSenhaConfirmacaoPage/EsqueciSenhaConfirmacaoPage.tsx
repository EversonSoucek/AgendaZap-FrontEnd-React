import { useParams } from "react-router-dom"
import { BotaoLink } from "../../components/BotaoLink/BotaoLink"
import { InputLogin } from "../../components/Input/InputLogin"
import { Logo } from "../../components/Logo/Logo"
import "./EsqueciSenhaConfirmacaoPage.css"
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa"

export const EsqueciSenhaConfirmacaoPage = () => {
  const { idEmpresa } = useParams<{ idEmpresa: string }>();

  if (idEmpresa) {
    UseVerificaEmpresa(idEmpresa);
  }
  //todo: tem que fazer no back end o esqueci senha
  return (
    <div className="confirmacao-senha">
      <form className="container confirmacao-senha__form">
        <Logo />
        <div className="balao-texto">
          Insira o nome do usuário a ser redefinido.
        </div>
        <div className="confirmacao-senha__inputs">
          <InputLogin placeholder="Usuario" tipo="text" onChange={(e) => console.log(e)} />
          <span className="mensagem-erro">Usuário não encontrado</span>
          <span className="mensagem-erro">Usuário está desativado</span>
          <button className="confirmacao-senha__botao" type="submit">Enviar</button>
        </div>
      </form>
    </div>
  )
}
