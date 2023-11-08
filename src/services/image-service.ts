import { getFormHeaders, getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { Image, ImageForm } from "@/types/image-type";
import { ClientInfo, Pageable } from "@/types/common-type";
import { RequestParams } from "@/types/request-params-type";


export async function getImages(clientInfo: ClientInfo, params?: RequestParams) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Pageable<Image>>('/api/images', { params, headers });
};

export async function getImage(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<Image>(`/api/images/${id}`, { headers });
};

export async function createImage(data: ImageForm, clientInfo: ClientInfo) {
    const headers = getFormHeaders(clientInfo);
    const formData = new FormData();
    formData.append("file", data.file);
    return await blogApiClient.post('/api/images/upload', formData, { headers });
};

export async function updateImage(id: string, data: ImageForm, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/images/${id}`, data, { headers })
};

export async function deleteImage(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/images/${id}`, { headers })
};