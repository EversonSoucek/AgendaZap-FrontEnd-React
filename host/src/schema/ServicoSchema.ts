import { z } from "zod";

export const ServicoSchema = z.object({
    id: z.number().optional(),
    descricao: z
        .string()
        .min(3, "Descrição deve ter pelo menos 3 caracteres")
        .max(255, "Descrição deve ter no máximo 255 caracteres"),
    valor: z
        .number()
        .min(0, "Valor não pode ser negativo"),
    status: z.boolean(),
    tempoDuracao: z
        .string()
        .regex(/^([0-1][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9])$/, "Formato deve ser HH:MM:SS")
});

export type ServicoSchemaType = z.infer<typeof ServicoSchema>;
