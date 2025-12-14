import { IUsuario } from "./iusuario"

export interface IApi {
    page: number
    per_pages: number
    total: number
    total_pages: number
    results: IUsuario[]
}
