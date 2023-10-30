import axios from "@/libs/axios";
import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { markdownToHtml } from "@/libs/markdown";
import { ClientInfo, Pageable } from "@/types/common-type";
import { Post, PostForm } from "@/types/post-type";
import { RequestParams } from "@/types/request-params-type";



export async function fetchPosts(params?: RequestParams): Promise<Pageable<Post>> {
    return await axios.get<Pageable<Post>>(`/api/posts`, { params }).then(({ data }) => data)
};

export async function fetchPostBySlug(slug: string): Promise<Post> {
    return await axios.get<Post>(`/api/posts?slug=${slug}`).then(({ data }) => {
        data.content.en = markdownToHtml(data.content.en);
        data.content.id = markdownToHtml(data.content.id);
        return data;
    })
};

export async function getPosts(clientInfo: ClientInfo, params?: RequestParams) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Pageable<Post>>('/api/posts', { params, headers });
};

export async function getPost(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Post>(`/api/posts/${id}`, { headers });
};

export async function createPost(data: PostForm, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post('/api/posts', data, { headers });
};

export async function updatePost(id: string, data: PostForm, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/posts/${id}`, data, { headers })
};

export async function deletePost(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/posts/${id}`, { headers })
};
