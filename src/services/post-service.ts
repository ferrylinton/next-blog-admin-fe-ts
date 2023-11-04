import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { ClientInfo, Pageable } from "@/types/common-type";
import { Post, PostFormData } from "@/types/post-type";
import { RequestParams } from "@/types/request-params-type";


export async function getPosts(clientInfo: ClientInfo, params?: RequestParams) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Pageable<Post>>('/api/posts', { params, headers });
};

export async function getPost(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Post>(`/api/posts/${id}`, { headers });
};

export async function createPost(data: PostFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post('/api/posts', data, { headers });
};

export async function updatePost(id: string, data: PostFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/posts/${id}`, data, { headers })
};

export async function deletePost(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/posts/${id}`, { headers })
};
