import { createContext, useContext, useState } from "react";

type TEmpresaContext = {
    empresaExiste: boolean | null;
    verificaEmpresa: (idEmpresa: string) => void;
}


export const EmpresaContext = createContext<TEmpresaContext | undefined>(undefined);


export const EmpresaProvider = ({ children }: { children: React.ReactNode }) => {
    const [empresaExiste, setEmpresaExiste] = useState<boolean | null>(null)

    const verificaEmpresa = async (idEmpresa: string) => {
        const reposta = await fetch(`http://localhost:5235/zapagenda/empresa/${idEmpresa}`)
        if (reposta.status == 404) {
            setEmpresaExiste(false)
        }
        else {
            setEmpresaExiste(true)
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