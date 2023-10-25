import { Audit, ClientInfo } from "./common-type"

export type Authority = {
    id: string
    code: string
    description: string
} & Audit

export type AuthorityProps = {
    authority?: Authority,
    clientInfo: ClientInfo
}

export type AuthorityForm = {
    code?: string,
    description?: string
}