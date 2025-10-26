import { z } from "zod";

export const AgendamentoSchema = z.object({
  dataHoraInicio: z.date(),
  observacao: z.string().optional(),
  idCliente: z.number(),
  idUsuario: z.number(),
  idServico: z.array(z.number()).min(1, "Selecione pelo menos um serviço"),
});

export type AgendamentoSchemaType = z.infer<typeof AgendamentoSchema>;
