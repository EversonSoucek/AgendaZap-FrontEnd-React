import api from "../../services/api";
import { endpoints } from "../endpoints/endpoints";

export default class AgendamentoGetAll {
    async execute(idEmpresa: string) {
        try {
            const response = await api(endpoints.agendamento.getAll(idEmpresa), 'GET')
            if (!response.ok) {
                throw response.statusText
            }
            const data = response.json()
            return data
        } catch (err) {
            throw err
        }
    }
}
