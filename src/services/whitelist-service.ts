import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { Whitelist, WhitelistFormData } from "@/types/whitelist-type";
import { ClientInfo } from "@/types/common-type";


export async function getWhitelists(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Whitelist[]>('/api/whitelists', { headers });
};

export async function getWhitelist(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Whitelist>(`/api/whitelists/${id}`, { headers });
};

export async function createWhitelist(data: WhitelistFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post('/api/whitelists', data, { headers });
};

export async function updateWhitelist(id: string, data: WhitelistFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/whitelists/${id}`, data, { headers })
};

export async function deleteWhitelist(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/whitelists/${id}`, { headers })
};