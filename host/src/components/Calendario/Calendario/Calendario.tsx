import { useCalendario } from "../../../context/CalendarioContext"
import { NavegacaoCalendario } from "../../NavegacaoCalendario/NavegacaoCalendario"
import { CalendarioMes } from "../CalendarioMes/CalendarioMes"
import "./Calendario.css"

export const Calendario = () => {
  const { modoVisualizacao } = useCalendario()

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
