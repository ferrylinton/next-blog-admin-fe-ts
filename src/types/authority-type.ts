import { Audit, ClientInfo } from "./common-type"

export type Authority = {
    id: string
    code: string
    description: string
} & Audit

export type AuthorityPageProps = {
    authority?: Authority,
    clientInfo: ClientInfo
}

export type AuthorityFormData = {
    id?: string,
    code?: string,
    description?: string
}