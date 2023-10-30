import { Audit, ClientInfo } from "./common-type"
import { Tag } from "./tag-type"

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

export type PostPageProps = {
    tags: Tag[],
    clientInfo: ClientInfo
}

export type PostFormProps = {
    post: PostFormData,
    tags: Tag[],
    clientInfo: ClientInfo
}

export type PostFormData = {
    id?: string,
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