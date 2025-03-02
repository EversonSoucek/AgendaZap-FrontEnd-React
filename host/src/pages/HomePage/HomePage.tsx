import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";
import api from "../../services/api";

export const HomePage = () => {
  const { idEmpresa } = useParams<{ idEmpresa: string }>();

  if (idEmpresa) {
    UseVerificaEmpresa(idEmpresa);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        let response = await api(`${idEmpresa}/usuario`, "GET");
        let data = await response.json();

        console.log("Usuários recebidos:", data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    fetchUserData();
  }, [idEmpresa]);

  return (
    <div>
      <h1>HomePage</h1>
      <p>Verifique o console para os usuários.</p>
    </div>
  );
};
