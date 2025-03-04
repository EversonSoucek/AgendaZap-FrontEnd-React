import "./CalendarioCelula.css"
export const CalendarioCelula = ({ dia }: { dia: Date }) => {
    return (
        <div className="calendario-celula">
            <div className="calendario-celula__dia">
                {dia.getDate()}
            </div>
        </div>
    )
}
