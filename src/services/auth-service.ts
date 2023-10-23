import axios from "@/libs/axios";
import { AuthData, LoginData } from "@/types/auth-type";
import { ClientInfo } from "@/types/common-type";


export async function getToken(username: string, password: string, clientIp: string, userAgent: string) {
    const url = '/auth/token';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': userAgent,
            'x-client-ip': clientIp,
        }
    };

    return await axios.post<AuthData>(url, {username, password}, config)
};

export async function revokeToken(clientInfo: ClientInfo) {
    const url = '/auth/revoke';
    const data = {};
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': clientInfo.userAgent,
            'x-client-ip': clientInfo.clientIp,
            'x-access-token': clientInfo.token
        }
    };

    return await axios.post<AuthData>(url, data, config)
};

export async function checkToken(token: string){
    const url = '/auth/checktoken';
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'x-access-token': token
        }
    };

    return await axios.post<{ttl: number}>(url, config)
};