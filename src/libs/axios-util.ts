import { ClientInfo } from "@/types/common-type";
import axios, { AxiosError, RawAxiosRequestHeaders } from "axios";
import { redirectToLogin } from "./redirect-util";
import { MessageError } from "@/types/response-type";
import { Dispatch, SetStateAction } from "react";


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

export function errorHandler(setMessageError: Dispatch<SetStateAction<MessageError | null>>, locale: string, error: any) {
    console.log(error);
    if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        if (axiosError.response?.status === 401) {
            return redirectToLogin(locale);
        } else {
            setMessageError({ message: axiosError.message });
        }
    } else {
        setMessageError({ message: error.message })
    }
}