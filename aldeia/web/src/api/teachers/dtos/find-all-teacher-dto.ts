import { Classe } from "@/models/classe";
import { Pagination } from "../../../models/pagination";
import { Teacher } from "../../../models/teacher";


export interface FindAllTeacherRequest {
    page: number
    perPage: number
    search?: string
    orderBy?: string
    sortedBy?: string
}

export interface FindAllTeacherResponse {
    data: Teacher[]
    meta: Pagination
}

export interface FindAllClassByTeacherRequest {
    teacherId: string
    page: number
    perPage: number
    search?: string
    orderBy?: string
    sortedBy?: string
}

export interface FindAllClassByTeacherResponse {
    data: Classe[]
    meta: Pagination
}