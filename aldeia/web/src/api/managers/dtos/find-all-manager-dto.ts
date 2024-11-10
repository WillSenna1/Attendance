import { Manager } from "../../../models/manager";
import { Pagination } from "../../../models/pagination";



export interface FindAllManagerRequest {
    page: number
    perPage: number
    search?: string
    orderBy?: string
    sortedBy?: string
}

export interface FindAllManagerResponse {
    data: Manager[]
    meta: Pagination
}