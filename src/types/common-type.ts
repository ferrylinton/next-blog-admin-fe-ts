import { AuthData } from "./auth-type"

export type Language = { id: "Indonesia", en: "English" }

export type Locale = 'id' | 'en';

export type Pagination = {
    total: number,
    totalPage: number,
    page: number,
    pageSize: number
}

export type Pageable<T> = {
    data: Array<T>,
    pagination: Pagination,
    keyword?: string,
    tag?: string
}

export type ClientInfo = {
    authData: AuthData | null,
    locale: string,
    clientIp: string,
    userAgent: string
}

export type Audit = {
    createdAt: string,
    createdBy: string,
    updatedAt?: string,
    updatedBy?: string
}

export type PageProps = {
    clientInfo: ClientInfo
}