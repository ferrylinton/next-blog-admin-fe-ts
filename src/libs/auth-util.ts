import { ClientInfo } from "@/types/common-type";

export const isAuthorize = (clientInfo: ClientInfo, authorities: string[]) => {
    for (let i = 0; i < authorities.length; i++) {
        if (clientInfo.authData?.authorities.includes(authorities[i])) {
            return true;
        }
    }

    return false;
}