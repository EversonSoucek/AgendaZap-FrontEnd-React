import { useEffect, useState } from "react"

type TUseVerificaEmpresa = {
    idEmpresa: string
}

// hooks/UseVerificaEmpresa.tsx

export const UseVerificaEmpresa = async (idEmpresa: string) => {
    try {
        const response = await fetch(`http://localhost:5235/zapagenda/empresa/${idEmpresa}`);
        if (response.status === 404) {
            return false; // Se não encontrar a empresa, retorna false
        }
        return true; // Se encontrar, retorna true
    } catch (error) {
        console.error("Erro ao verificar empresa", error);
        return false;
    }
};

