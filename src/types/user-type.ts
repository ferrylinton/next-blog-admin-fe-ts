import { Audit, ClientInfo } from "./common-type"

export type User = {
    id: string
    username: string,
    password: string,
    email: string,
    loginAttempt: number,
    activated: boolean,
    locked: boolean,
    authorities: string[]
} & Audit

export type UserProps = {
    user?: User,
    clientInfo: ClientInfo
}

export type UserForm = {
    username?: string,
    password?: string,
    passwordConfirm?: string,
    email?: string,
    loginAttempt?: number,
    activated?: boolean,
    locked?: boolean,
    authorities?: string[]
}