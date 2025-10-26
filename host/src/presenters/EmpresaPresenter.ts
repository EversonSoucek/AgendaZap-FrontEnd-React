import { tipoEmpresa } from "../enum/TipoEmpresa";

export class EmpresaPresente {
    idEmpresa?: string;
    nomeFantasia: string = '';
    razaoSocial: string = '';
    cnpj:string = '';
    tipoEmpresa: tipoEmpresa = tipoEmpresa.GENERICO;
    email: string = '';
    telefone: string = '';
    cep: string = '';
    logradouro: string = '';
    numero: string = '';
    complemento: string = '';
    sigla: string = '';
    nomeMunicipio: string = '';
}