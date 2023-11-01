import { Authority } from "./authority-type"
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

export type UserPageProps = {
    authorities: Authority[],
    clientInfo: ClientInfo
}

export type UserFormProps = {
    user: UserFormData,
    authorities: Authority[],
    clientInfo: ClientInfo
}

export type UserFormData = {
    id?: string,
    username?: string,
    password?: string,
    passwordConfirm?: string,
    email?: string,
    loginAttempt?: number,
    activated?: boolean,
    locked?: boolean,
    authorities?: string[]
}