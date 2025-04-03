import { isToday, parseISO } from "date-fns"
import "./CalendarioCelula.css"
import { useCalendario } from "../../../context/CalendarioContext"
import { TAgendamento } from "../../../types/TAgendamento"

type TCalendarioCelula = {
    dia: Date,
    agendamentos: TAgendamento[]
}

//falar pro Gustavo prototipar quando for o dia
export const CalendarioCelula: React.FC<TCalendarioCelula> = ({ dia, agendamentos }) => {
    const { dataSelecionada } = useCalendario()
    return (
        <div className={`calendario-celula ${isToday(dia) ? "hoje" : ""} ${dia.getMonth() === dataSelecionada.getMonth() ? "" : "calendario-celula--fora-mes"} `}>
            <div className={`calendario-celula__dia ${dia.getMonth() === dataSelecionada.getMonth() ? "" : "calendario-celula__dia--fora-mes"}`}>
                {dia.getDate()}
                <div className="calendario-celula__agendamentos">
                    {agendamentos.map((agendamento) => (
                        <span key={agendamento.idAgendamento} className="calendario-celula__agendamento"><div className="ponto"></div >{`${parseISO(agendamento.dataHoraInicio.toString()).getHours().toString()}:${parseISO(agendamento.dataHoraInicio.toString()).getMinutes().toString()}`} | {agendamento.usuario.nomeUsuario}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}
