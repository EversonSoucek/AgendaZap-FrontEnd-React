import { TUsuarioLogin } from "../types/TUsuarioLogin"

type TApi = (
    endpoint: string,
    metodo: string,
    data?: TUsuarioLogin | null
) => Promise<Response>

const api: TApi = (endpoint, metodo, data) => {
    return fetch(`http://localhost:5235/${endpoint}`, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    }
    )
}

export default api