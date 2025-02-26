import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UseVerificaEmpresa } from "../../hooks/UseVerificaEmpresa";

export const HomePage = () => {
  const [userData, setUserData] = useState(null);
  const { idEmpresa } = useParams<{ idEmpresa: string }>();

  if (idEmpresa) {
    UseVerificaEmpresa(idEmpresa);
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://localhost:5235/${idEmpresa}/usuario`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao buscar usuário");
        }

        const data = await response.json();
        setUserData(data);
        console.log("Usuário recebido:", data);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <h1>HomePage</h1>
      {userData ? (
        <pre>{JSON.stringify(userData, null, 2)}</pre>
      ) : (
        <p>Carregando usuário...</p>
      )}
    </div>
  );
};
