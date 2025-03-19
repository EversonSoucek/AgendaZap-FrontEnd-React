import { createContext, useContext, useState } from "react";
import api from "../services/api";

type TEmpresaContext = {
    empresaExiste: boolean | null;
    verificaEmpresa: (idEmpresa: string) => void;
}


export const EmpresaContext = createContext<TEmpresaContext | undefined>(undefined);


export const EmpresaProvider = ({ children }: { children: React.ReactNode }) => {
    const [empresaExiste, setEmpresaExiste] = useState<boolean | null>(null)

    const verificaEmpresa = async (idEmpresa: string) => {
        try {
            const resposta = await api(`empresa/${idEmpresa}`, "GET")
            if (resposta.status == 404) {
                setEmpresaExiste(false)
            }
            else {
                setEmpresaExiste(true)
            }
        }
        catch(err) {
            throw new Error()
        }
    }

    const valor = {
        empresaExiste,
        verificaEmpresa
    }

    return (
        <EmpresaContext.Provider value={valor}>
            {children}
        </EmpresaContext.Provider>
    )
}
export const useEmpresa = () => {
    const context = useContext(EmpresaContext);
    if (!context) {
        throw new Error("useEmpresa deve ser usado dentro de um EmpresaProvider");
    }
    return context;
};