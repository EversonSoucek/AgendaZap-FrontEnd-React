export const endpoints = {
    usuario: {
        create: (idEmpresa : string) => `${idEmpresa}/usuario`,
        getAll: (idEmpresa: string) => `${idEmpresa}/usuario`,
        delete: (idEmpresa: string, id: number) => `${idEmpresa}/usuario/${id}`,
        getById: (idEmpresa: string, id: number) => `${idEmpresa}/usuario/${id}`
    }
}