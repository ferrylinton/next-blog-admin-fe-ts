import { Audit, ClientInfo } from "./common-type"

export type Tag = {
    id: string,
    name: string
}& Audit

export type TagProps = {
    tag?: Tag,
    clientInfo: ClientInfo
}

export type TagForm = {
    name?: string
}