import { IProduct } from "./iproduct"

export interface Main {
    page: number
    per_pages: number
    total: number
    total_pages: number
    results: IProduct[]
}
