export type AuthData = {
    token: string,
    username: string,
    authorities: string[],
    ip: string,
    browser: string,
    os: string
}

export type LoginData = {
    username: string,
    password: string
}