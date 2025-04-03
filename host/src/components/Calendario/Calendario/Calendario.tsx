import { useEffect } from "react"
import { useCalendario } from "../../../context/CalendarioContext"
import { NavegacaoCalendario } from "../../NavegacaoCalendario/NavegacaoCalendario"
import { CalendarioMes } from "../CalendarioMes/CalendarioMes"
import "./Calendario.css"
import { useParams } from "react-router-dom"
import { UseAgendamento } from "../../../context/AgendamentoContext"

export const Calendario = () => {
  const { modoVisualizacao } = useCalendario()
  const { GetAgendamentos } = UseAgendamento();
  const { idEmpresa } = useParams<{ idEmpresa: string }>();

  useEffect(() => {
    if(idEmpresa) {
      GetAgendamentos(idEmpresa)
    }
  },[])


  const determinaCalendario = () => {
    if (modoVisualizacao == "dia") {
      return <h1>dia</h1>
    }
    if (modoVisualizacao == "semana") {
      return <h1>semana</h1>
    }
    if (modoVisualizacao == "mes") {
      return <CalendarioMes />
    }
  }


  return (
    <div className="container calendario">
      <NavegacaoCalendario />
      {determinaCalendario()}
    </div>
  )
}
