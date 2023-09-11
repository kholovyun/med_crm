export interface IErrorResponse<T> {
    data: T
    status: number | string
    error?: string
} 