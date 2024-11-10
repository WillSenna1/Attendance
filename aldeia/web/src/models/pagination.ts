

export interface Pagination {
    total: number
    lastPage: number
    currentPage: number
    perPage: number
    prev: boolean | null
    next: boolean | null
}