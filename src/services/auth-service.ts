import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { AuthData } from "@/types/auth-type";
import { ClientInfo } from "@/types/common-type";


export async function getToken(username: string, password: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post<AuthData>('/auth/token', { username, password }, { headers })
};

export async function revokeToken(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post<AuthData>('/auth/revoke', {}, { headers });
};

export async function checkToken(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post<{ ttl: number }>('/auth/checktoken', {}, { headers })
};