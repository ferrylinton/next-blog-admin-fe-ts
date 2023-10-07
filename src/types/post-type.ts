export type Post = {
    id: string,
    createdBy: string,
    updatedBy?: string,
    createdAt: Date,
    updatedAt?: Date
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
}