export type TFuncionario =  {
  id: number;
  idEmpresa: number;
  idCargo: number;
  nomeUsuario: string;
  nomeInteiro: string;
  cpf: string;
  senha: string;
  email?: string;
  tipoUsuario: Date;
  ultimaModificacao: Date;
  ultimoLogin: Date;
  statusUsuario: boolean;
  perfilBloqueado: boolean;
  tentativasLogin: number;
  dataUltimaTentativaLogin: Date;
  horarioInicio: string; // TimeSpan -> string
  horarioFim: string; // TimeSpan -> string
}