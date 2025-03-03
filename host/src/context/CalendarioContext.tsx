import { createContext, useContext, useState } from "react";

type TCalendarioContext = {
    dataSelecionada: Date
}

export const CalendarioContext = createContext<TCalendarioContext | undefined>(undefined);

export const CalendarioProvider = ({ children }: { children: React.ReactNode }) => {
    const [dataSelecionada, setDataSelecionada] = useState<Date>(new Date())

    const valor = {
        dataSelecionada,
    }
    return (
        <CalendarioContext.Provider value={valor}>{children}</CalendarioContext.Provider>
    )
}

export const useCalendario = () => {
    const context = useContext(CalendarioContext)
    if (!context) {
        throw new Error("useCalendario deve ser usado dentro de CalendarioProvider")
    }
    return context
}