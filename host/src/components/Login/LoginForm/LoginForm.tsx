import { useState } from 'react';
import { TUsuarioLogin } from '../../../types/TUsuarioLogin';
import { Logo } from '../../Logo/Logo'
import api from '../../../services/api';
import { Link, useNavigate } from 'react-router-dom';
import { InputLogin } from '../../Input/InputLogin';
import { useErrorBoundary } from 'react-error-boundary';
import "./LoginForm.css"

export const LoginFormUsuario = ({ idEmpresa }: { idEmpresa: string | undefined }) => {
    const [usuario, setUsuario] = useState<TUsuarioLogin>({ nomeUsuario: "", senha: "" });
    const [validaCredencial, setValidaCredencial] = useState<boolean>(false)
    const [validaUsuarioAtivo, setValidaUsuarioAtivo] = useState<boolean>(true)
    let navigate = useNavigate();
    const { showBoundary } = useErrorBoundary();


    const logar = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usuarioDado = usuario
        try {
            const response = await api(`${idEmpresa}/autentificacao`, "POST", usuarioDado)
            if (response.status === 200) {
                navigate(`/${idEmpresa}/home`);
            }
            if (response.status === 401) {
                setValidaCredencial(true)
            }
            if (response.status === 404) {
                setValidaCredencial(true)
            }
            if (response.status === 400) {
                setValidaUsuarioAtivo(false)
            }
        }
        catch (error) {
            showBoundary(error)
        };

    }
    const aoMudarInput = (e: React.ChangeEvent<HTMLInputElement>, campo: string) => {
        setUsuario({ ...usuario, [campo]: e.target.value });
    };
    return (
        <form className="login__form" onSubmit={(e => logar(e))}>
            <Logo />
            <div className="login__form__logar">
                {/*todo: Pedir pro gustavo prototipar os erros de login*/}
                <InputLogin placeholder="Login" tipo="text" onChange={e => aoMudarInput(e, 'nomeUsuario')} />
                <InputLogin placeholder="Senha" tipo="password" onChange={e => aoMudarInput(e, 'senha')} />
                <span className={validaCredencial ? "mensagem-erro" : "invisivel"}>Nome de usuário ou senha incorreta</span>
                <span className={validaUsuarioAtivo ? "invisivel" : "mensagem-erro"}>Usuário foi desativado</span>
                <Link className="login__form__esqueci-senha" to={`/${idEmpresa}/esqueciSenhaConfirma`}>
                    Esqueci minha senha
                </Link>
                <button className='login__form__botao' type="submit">Entrar</button>
            </div>
        </form>
    )
}