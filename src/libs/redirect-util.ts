
export const redirectToLogin = (locale: string | undefined) => {
    if (typeof window === 'undefined') {
        return {
            redirect: {
                destination: locale === 'id' ? '/login' : `/${locale}/login`,
                permanent: false
            }
        }
    } else {
        window.location.replace(locale === 'id' ? `/login` : `/${locale}/login`);
    }
}

export const redirectTo503 = (locale: string | undefined) => {
    if (typeof window === 'undefined') {
        return {
            redirect: {
                destination: locale === 'id' ? '/503' : `/${locale}/503`,
                permanent: false
            }
        }
    } else {
        window.location.replace(locale === 'id' ? `/503` : `/${locale}/503`);
    }
}

export const redirectTo429 = (locale: string | undefined) => {
    if (typeof window === 'undefined') {
        return {
            redirect: {
                destination: locale === 'id' ? '/429' : `/${locale}/429`,
                permanent: false
            }
        }
    } else {
        window.location.replace(locale === 'id' ? `/429` : `/${locale}/429`);
    }
}

export const redirectTo403 = (locale: string | undefined, url: string) => {
    if (typeof window === 'undefined') {
        return {
            redirect: {
                destination: locale === 'id' ? `/403?url=${url}` : `/${locale}/403?url=${url}`,
                permanent: false
            }
        }
    } else {
        window.location.replace(locale === 'id' ? `/403?url=${url}` : `/${locale}/403?url=${url}`);
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