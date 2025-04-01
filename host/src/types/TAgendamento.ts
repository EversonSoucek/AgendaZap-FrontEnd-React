import { TCliente } from "./TCliente"
import { TUsuario } from "./TUsuario"

export type TAgendamento = {
    IdAgendamento: number,
    StatusAgendamento: string,
    DataHoraInicio: Date,
    DataHoraFim: Date,
    Observacao?: string,
    ValorTotal: number,
    Cliente: TCliente
    Usuario: TUsuario
}