export const paths = {
    funcionarios: {
        create: (idEmpresa: string) => `/${idEmpresa}/funcionarios/adicionar`,
        edit: (idEmpresa: string, id: number) => `/${idEmpresa}/funcionarios/${id}`
    }
}