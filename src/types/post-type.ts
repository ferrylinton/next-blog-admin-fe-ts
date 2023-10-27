import { Audit, ClientInfo } from "./common-type"

export type Post = {
    id: string,
    slug: string,
    tags: string[],
    title: {
        id: string,
        en: string
    },
    description: {
        id: string,
        en: string
    },
    content: {
        id: string,
        en: string
    }
} & Audit

export type PostProps = {
    post?: Post,
    clientInfo: ClientInfo
}

export type PostForm = {
    slug?: string,
    tags?: string[],
    title?: {
        id: string,
        en: string
    },
    description?: {
        id: string,
        en: string
    },
    content?: {
        id: string,
        en: string
    }
}