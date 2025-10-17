export const paths = {
    funcionarios: {
        list: (idEmpresa: string) => `/${idEmpresa}/funcionarios`,
        create: (idEmpresa: string) => `/${idEmpresa}/funcionarios/adicionar`,
        edit: (idEmpresa: string, id: number) => `/${idEmpresa}/funcionarios/${id}`
    },
    cliente: {
        create: (idEmpresa: string) => `/${idEmpresa}/clientes/adicionar`,
        list: (idEmpresa: string) => `/${idEmpresa}/clientes`,
        edit: (idEmpresa: string, id: number) => `/${idEmpresa}/clientes/${id}`
    },
    servico: {
        create: (idEmpresa: string) => `/${idEmpresa}/servicos/adicionar`,
        list: (idEmpresa: string) => `/${idEmpresa}/servicos`,
        edit: (idEmpresa: string, id: number) => `/${idEmpresa}/servicos/${id}`
    }
}