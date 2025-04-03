import { createContext, useContext, useState } from "react";
import { TAgendamento } from "../types/TAgendamento";
import api from "../services/api";

type TAgendamentoContext = {
    agendamentos: TAgendamento[];
    setAgendamentos: React.Dispatch<React.SetStateAction<TAgendamento[]>>;
    GetAgendamentos: (idEmpresa: string) => void;
};

export const AgendamentoContext = createContext<TAgendamentoContext | undefined>(undefined);

export const AgendamentoProvider = ({ children }: { children: React.ReactNode }) => {
    const [agendamentos, setAgendamentos] = useState<TAgendamento[]>([]);

    const GetAgendamentos = async (idEmpresa: string) => {
        const resposta = await api(`${idEmpresa}/agendamento`, "GET");
        const data: TAgendamento[] = await resposta.json();
        setAgendamentos(data);
    };

    const valor = {
        agendamentos,
        setAgendamentos,
        GetAgendamentos,
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
