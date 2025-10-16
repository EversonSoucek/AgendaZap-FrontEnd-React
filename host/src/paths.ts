export const paths = {
    funcionarios: {
        list: (idEmpresa: string) => `/${idEmpresa}/funcionarios`,
        create: (idEmpresa: string) => `/${idEmpresa}/funcionarios/adicionar`,
        edit: (idEmpresa: string, id: number) => `/${idEmpresa}/funcionarios/${id}`
    }
}