import { Audit, ClientInfo } from "./common-type"

export type Whitelist = {
    id: string
    ip: string
    description: string
} & Audit

export type WhitelistPageProps = {
    whitelist?: Whitelist,
    clientInfo: ClientInfo
}

export type WhitelistFormData = {
    id?: string,
    ip?: string,
    description?: string
}