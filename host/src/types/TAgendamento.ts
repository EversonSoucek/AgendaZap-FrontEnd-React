import { TCliente } from "./TCliente"
import { TUsuario } from "./TUsuario"

export type TAgendamento = {
    idAgendamento: number,
    statusAgendamento: string,
    dataHoraInicio: Date,
    dataHoraFim: Date,
    observacao?: string,
    valorTotal: number,
    cliente: TCliente
    usuario: TUsuario
}