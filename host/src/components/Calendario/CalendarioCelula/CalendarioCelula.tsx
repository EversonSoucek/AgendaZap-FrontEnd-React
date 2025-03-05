import { isToday } from "date-fns"
import "./CalendarioCelula.css"

//falar pro Gustavo prototipar quando for o dia
export const CalendarioCelula = ({ dia }: { dia: Date }) => {
    return (
        <div className={`calendario-celula ${isToday(dia) ? "hoje" : ""} `}>
            <div className={`calendario-celula__dia`}>
                {dia.getDate()}
            </div>
        </div>
    )
}
