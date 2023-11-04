import { getHeaders } from "@/libs/axios-util";
import blogApiClient from "@/libs/blog-api-client";
import { ChangePassworddFormData, User, UserFormData } from "@/types/user-type";
import { ClientInfo } from "@/types/common-type";


export async function getUsers(clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<User[]>('/api/users', { headers });
};

export async function getUser(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.get<User>(`/api/users/${id}`, { headers });
};

export async function createUser(data: UserFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post('/api/users', data, { headers });
};

export async function updateUser(id: string, data: UserFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.put(`/api/users/${id}`, data, { headers })
};

export async function changePassword(data: ChangePassworddFormData, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.post(data.id ? `/api/users/${data.id}/changepassword` : `/api/users/changepassword`, data, { headers })
};

export async function deleteUser(id: string, clientInfo: ClientInfo) {
    const headers = getHeaders(clientInfo);
    return await blogApiClient.delete(`/api/users/${id}`, { headers })
};