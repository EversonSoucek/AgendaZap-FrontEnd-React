import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GenericTable, Column } from "../../components/GenericTable/GenericTable";
import { TFuncionario } from "../../types/TFuncionario";
import UsuarioGetAll from "../../useCases/usuario/usuarioGetAll";
import UsuarioDelete from "../../useCases/usuario/UsuarioDelete";
import { paths } from "../../paths";

export default function FuncionariosListPage() {
  const { idEmpresa } = useParams<{ idEmpresa: string }>();
  const [funcionarios, setFuncionarios] = useState<TFuncionario[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate()

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
    { field: "id", headerName: "ID" },
    { field: "nomeInteiro", headerName: "Nome Completo" },
    { field: 'nomeUsuario', headerName: "Nome de de usuário" },
    { field: "cpf", headerName: "CPF" },
    { field: "email", headerName: "E-mail" },
  ];

  const handleEdit = useCallback((funcionario: TFuncionario) => {
    navigate(paths.funcionarios.edit(idEmpresa as string, funcionario.id))
  }, [navigate]);

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

  const handleCreate = useCallback(() => {
    navigate(paths.funcionarios.create(idEmpresa as string))
  }, [navigate])

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
      onCreate={handleCreate}
    />
  );
}

