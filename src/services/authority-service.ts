import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { Authority, AuthorityFormData } from "@/types/authority-type";
import { ClientInfo } from "@/types/common-type";


export async function getAuthorities(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Authority[]>('/api/authorities', { headers });
};

export async function getAuthority(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Authority>(`/api/authorities/${id}`, { headers });
};

export async function createAuthority(data: AuthorityFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post('/api/authorities', data, { headers });
};

export async function updateAuthority(id: string, data: AuthorityFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/authorities/${id}`, data, { headers })
};

export async function deleteAuthority(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/authorities/${id}`, { headers })
};