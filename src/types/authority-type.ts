export type Authority = {
    id: string
    code: string
    description: string
    createdAt: Date,
    updatedAt?: Date
}

export type AuthorityFormType = {
    code: string,
    description: string
}