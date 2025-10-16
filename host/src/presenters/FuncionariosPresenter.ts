import { Cargo } from "../enum/Cargo";

export default class FuncionariosPresenter {
    id?: number;
    idEmpresa: string = '';
    idCargo: Cargo = Cargo.USER ;
    nomeUsuario: string = '';
    nomeInteiro: string = '';
    cpf: string = '';
    senha: string = '';
    email?: string;
    statusUsuario: boolean = true;
}