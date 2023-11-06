import { ClientInfo } from "@/types/common-type";

export const hasAuthority = (authority: string, clientInfo: ClientInfo) => {
    try {
        return clientInfo.authData?.authorities.includes(authority);
    } catch (error) {
        
    }
    
    return false;
}