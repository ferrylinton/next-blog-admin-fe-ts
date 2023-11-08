
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