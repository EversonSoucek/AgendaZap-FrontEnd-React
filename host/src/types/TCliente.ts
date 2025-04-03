export type TCliente = {
    idCliente : number,
    nome? : string,
    telefone : string,
    cpf : string,
    observacao : string,
    email : string,
    dataCadastro : Date,
    dataNascimento : Date,
    status : boolean
}