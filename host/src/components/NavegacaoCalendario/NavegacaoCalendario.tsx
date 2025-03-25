import { addDays, addMonths } from "date-fns"
import { useCalendario } from "../../context/CalendarioContext"
import "./NavegacaoCalendario.css"
import { useEffect, useState } from "react"
import api from "../../services/api"
import { useParams } from "react-router-dom"

type TUsuariosFiltro = {
    idusuario: number,
    nomeUsuario: string
}

export const NavegacaoCalendario = () => {
    const { dataSelecionada, setDataSelecionada, modoVisualizacao, setModoVisualizacao } = useCalendario()
    const [usuarios, setUsuarios] = useState<TUsuariosFiltro[]>([]);
    const { idEmpresa } = useParams<{ idEmpresa: string }>();

    useEffect(() => {
        const fetchData = async () => {
            const resposta = await api(`filtro?IdEmpresa=${idEmpresa}`, "GET");
            if (!resposta.ok) {
                throw new Error
            }
            setUsuarios(await resposta.json())
            console.log(usuarios);
            
        };
        fetchData();
    }, [idEmpresa]);

    const DataPorExtenso: string = dataSelecionada.toLocaleString("pt-br", { month: "long", year: "numeric" })

    const alteraData = (proximo: boolean) => {
        if (modoVisualizacao === "dia") {
            proximo ? setDataSelecionada(addDays(dataSelecionada, 1)) : setDataSelecionada(addDays(dataSelecionada, -1))
        }
        if (modoVisualizacao === "semana") {
            proximo ? setDataSelecionada(addDays(dataSelecionada, 7)) : setDataSelecionada(addDays(dataSelecionada, -7))
        }
        if (modoVisualizacao === "mes") {
            proximo ? setDataSelecionada(addMonths(dataSelecionada, 1)) : setDataSelecionada(addMonths(dataSelecionada, -1))
        }
    }

    return (
        <div className="container navegacao-calendario">
            <div className="navegacao-calendario__itens">
                <select className="navegacao-calendario__funcionario">
                    {usuarios.map(usuario => (
                        <option key={usuario.idusuario} value={usuario.idusuario}>{usuario.nomeUsuario}</option>
                    ))}
                </select>
                <h2 className="navegacao-calendario__data">{`${DataPorExtenso.charAt(0).toUpperCase() + DataPorExtenso.slice(1)}`}</h2>

                <div className="navegacao-calendario__botoes">
                    <button onClick={() => alteraData(false)} className="navegacao-calendario__altera">&lt;</button>
                    <button onClick={() => setModoVisualizacao("dia")} className={`navegacao-calendario__botao ${modoVisualizacao == "dia" ? "selecionado" : ""}`}>Dia</button>
                    <button onClick={() => setModoVisualizacao("semana")} className={`navegacao-calendario__botao ${modoVisualizacao == "semana" ? "selecionado" : ""}`}>Semana</button>
                    <button onClick={() => setModoVisualizacao("mes")} className={`navegacao-calendario__botao ${modoVisualizacao == "mes" ? "selecionado" : ""}`}>Mês</button>
                    <button onClick={() => alteraData(true)} className="navegacao-calendario__altera">&gt;</button>
                </div>
            </div>
        </div>
    )
}
