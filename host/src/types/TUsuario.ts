export type TUsuario = {
    idUsuario : number,
    nomeUsuario : string,
    ultimaModificacao : Date,
    dataCadastro : Date,
    nomeInteiro : string,
    status: boolean,
    senha : string,
    email? : string,
    cpf? : string
}