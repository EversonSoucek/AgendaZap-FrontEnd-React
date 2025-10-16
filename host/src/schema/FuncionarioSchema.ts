import { z } from "zod";

export const FuncionarioSchema = z.object({
    id: z.number().optional(),
    idEmpresa: z.string(),
    idCargo: z.number().min(1, "O cargo é obrigatório"),
    nomeUsuario: z.string().min(2, "Nome de usuário é obrigatório"),
    nomeInteiro: z.string().min(3, "Nome completo é obrigatório"),
    cpf: z.string().min(11, "CPF inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    email: z.string().optional(),
    statusUsuario: z.boolean(),
});

export type FuncionarioSchemaType = z.infer<typeof FuncionarioSchema>;
