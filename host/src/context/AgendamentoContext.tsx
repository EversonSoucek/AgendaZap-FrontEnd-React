import { createContext, useContext, useEffect, useState } from "react";
import { TAgendamento } from "../types/TAgendamento";
import api from "../services/api";

type TAgendamentoContext = {
    agendamentos: TAgendamento[];
    setAgendamentos: React.Dispatch<React.SetStateAction<TAgendamento[]>>;
    GetAgendamentos: (idEmpresa: string) => void;
    isLoading: boolean;
};

export const AgendamentoContext = createContext<TAgendamentoContext | undefined>(undefined);

export const AgendamentoProvider = ({ children }: { children: React.ReactNode }) => {
    const [agendamentos, setAgendamentos] = useState<TAgendamento[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const GetAgendamentos = async (idEmpresa: string) => {
        setIsLoading(true); // ⬅ Inicia o carregamento
        try {
            const resposta = await api(`${idEmpresa}/agendamento`, "GET");
            const data: TAgendamento = await resposta.json();
            setAgendamentos(Array.isArray(data) ? data : [data]);
        } catch (error) {
            console.error("Erro ao buscar agendamentos:", error);
        } finally {
            setIsLoading(false); // ⬅ Finaliza o carregamento
        }
    };
    

    const valor = {
        agendamentos,
        setAgendamentos,
        GetAgendamentos,
        isLoading,
        setIsLoading
    };

    return (
        <AgendamentoContext.Provider value={valor}>
            {children}
        </AgendamentoContext.Provider>
    );
};

export const UseAgendamento = () => {
    const context = useContext(AgendamentoContext);
    if (!context) {
        throw new Error("UseAgendamento deve ser usado dentro do AgendamentoProvider");
    }
    return context;
};
