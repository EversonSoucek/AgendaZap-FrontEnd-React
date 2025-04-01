export type TUsuario = {
    IdUsuario : number,
    NomeUsuario : string,
    UltimaModificacao : Date,
    DataCadastro : Date,
    NomeInteiro : string,
    Status: boolean,
    Senha : string,
    Email? : string,
    Cpf? : string
}