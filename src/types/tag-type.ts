import { Audit, ClientInfo } from "./common-type"

export type Tag = {
    id: string,
    name: string
} & Audit

export type TagPageProps = {
    tag: Tag,
    clientInfo: ClientInfo
}

export type TagFormData = {
    id?: string,
    name?: string
}