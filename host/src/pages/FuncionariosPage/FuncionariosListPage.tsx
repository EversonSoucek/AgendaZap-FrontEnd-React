import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GenericTable, Column } from "../../components/GenericTable/GenericTable";
import { TFuncionario } from "../../types/TFuncionario";
import UsuarioGetAll from "../../useCases/usuario/usuarioGetAll";
import UsuarioDelete from "../../useCases/usuario/usuarioDelete";

export default function FuncionariosListPage() {
  const { idEmpresa } = useParams<{ idEmpresa: string }>();
  const [funcionarios, setFuncionarios] = useState<TFuncionario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFuncionarios = async () => {
      if (!idEmpresa) {
        setError("ID da empresa não encontrado na URL.");
        setLoading(false);
        return;
      }

      try {
        const useCase = new UsuarioGetAll();
        const data = await useCase.execute(idEmpresa);
        setFuncionarios(data);
      } catch (err: any) {
        console.error(err);
        setError("Erro ao carregar funcionários.");
      } finally {
        setLoading(false);
      }
    };

    fetchFuncionarios();
  }, [idEmpresa]);

  const columns: Column<TFuncionario>[] = [
    { field: "nomeInteiro", headerName: "Nome Completo" },
    { field: "cpf", headerName: "CPF" },
    { field: "email", headerName: "E-mail" },
    { field: 'nomeUsuario', headerName: "Nomde de usuário" }
  ];

  const handleEdit = (funcionario: TFuncionario) => {
    console.log("Editar funcionário:", funcionario);
  };

  const handleDelete = useCallback(
    async (funcionario: TFuncionario) => {
      try {
        const usuarioDelete = new UsuarioDelete();
        await usuarioDelete.execute(idEmpresa as string, funcionario.id);

        const useCase = new UsuarioGetAll();
        const data = await useCase.execute(idEmpresa as string);
        setFuncionarios(data);
      } catch (error) {
        console.error("Erro ao excluir funcionário:", error);
      }
    },
    [idEmpresa, setFuncionarios]
  );

  if (loading) return <p>Carregando funcionários...</p>;
  if (error) return <p>{error}</p>;

  return (
    <GenericTable
      title="Funcionários"
      columns={columns}
      data={funcionarios}
      onEdit={handleEdit}
      onDelete={handleDelete}
      searchPlaceholder="Buscar funcionário..."
    />
  );
}
function async(arg0: (funcionario: TFuncionario) => void): any {
  throw new Error("Function not implemented.");
}

