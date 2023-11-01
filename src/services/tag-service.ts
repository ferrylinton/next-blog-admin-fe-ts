import axios from "@/libs/axios";
import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { Tag, TagFormData } from "@/types/tag-type";
import { ClientInfo } from "@/types/common-type";

export const TAGS_KEY = ['tags'];

export async function fetchTags(): Promise<Array<Tag>> {
    return await axios.get<Array<Tag>>(`/api/tags`).then(({ data }) => data)
};

export async function getTags(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Tag[]>('/api/tags', { headers });
};

export async function getTag(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Tag>(`/api/tags/${id}`, { headers });
};

export async function createTag(data: TagFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post('/api/tags', data, { headers });
};

export async function updateTag(id: string, data: TagFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/tags/${id}`, data, { headers })
};

export async function deleteTag(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/tags/${id}`, { headers })
};