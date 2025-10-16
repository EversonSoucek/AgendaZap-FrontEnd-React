export const endpoints = {
    usuario: {
        getAll: (idEmpresa: string) => `${idEmpresa}/usuario`,
        delete: (idEmpresa: string, id: number) => `${idEmpresa}/usuario/${id}`,
        getById: (idEmpresa: string, id: number) => `${idEmpresa}/usuario/${id}`
    }
}