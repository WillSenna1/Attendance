import { Lesson } from "../../../models/lesson";
import { Pagination } from "../../../models/pagination";


export interface FindAllLessonRequest {
    page: number
    perPage: number
    search: string
    orderBy?: string
    sortedBy?: string
}

export interface FindAllLessonResponse {
    data: Lesson[]
    meta: Pagination
}