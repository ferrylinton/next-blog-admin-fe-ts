
export const redirectToLogin = (locale: string | undefined) => {
    return {
        redirect: {
            destination: locale === 'id' ? '/login' : `/${locale}/login`,
            permanent: false
        }
    }
}

export const redirectTo403 = (locale: string | undefined, url: string) => {
    return {
        redirect: {
            destination: locale === 'id' ? `/403?url=${url}` : `/${locale}/403?url=${url}`,
            permanent: false
        }
    }
}

export const redirectToPath = (locale: string, path: string) => {
    return {
        redirect: {
            destination: locale === 'id' ? path : `/${locale}${path}`,
            permanent: false
        }
    }
}