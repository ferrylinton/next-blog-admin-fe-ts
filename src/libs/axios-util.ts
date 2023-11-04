import { ClientInfo } from "@/types/common-type";
import axios, { RawAxiosRequestHeaders } from "axios";


export function getHeaders(clientInfo: ClientInfo) {
    const headers: RawAxiosRequestHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-client-ip': clientInfo.clientIp
    };

    if (clientInfo.authData?.token) {
        headers['x-access-token'] = clientInfo.authData?.token;
    }

    if (clientInfo.locale) {
        headers['x-accept-language'] = clientInfo.locale;
    }

    if (typeof window === 'undefined') {
        headers['User-Agent'] = clientInfo.userAgent;
    }

    return headers;
};

export function getFormHeaders(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    headers['Content-Type'] = 'multipart/form-data';
    return headers;
};

export function errorHandler(error: any) {
    if (axios.isAxiosError(error)) {
        const response = error?.response

        if (response && response.status === 401) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        } else if (response && response.status === 404) {
            return {
                notFound: true
            }
        }
    }

    return {
        props: {
            error: {
                message: error.message
            }
        }
    }

}