import { NavegacaoCalendario } from "../../NavegacaoCalendario/NavegacaoCalendario"
import { CalendarioMes } from "../CalendarioMes/CalendarioMes"
import "./Calendario.css"

export const Calendario = () => {
  return (
    <div className="container calendario">
      <NavegacaoCalendario />
      <CalendarioMes />
    </div>
  )
}
