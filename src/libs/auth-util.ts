import { COOKIE_AUTH_DATA } from "@/configs/constant";
import { logger } from "@/configs/winston";
import { AuthData } from "@/types/auth-type";
import { ClientInfo } from "@/types/common-type";
import { GetServerSidePropsContext, NextApiRequest } from "next";

export function authDataFromContext(context: GetServerSidePropsContext): AuthData | null {
    try {
        if (context.req.cookies[COOKIE_AUTH_DATA]) {
            return JSON.parse(context.req.cookies[COOKIE_AUTH_DATA]);
        }
    } catch (error) {
        logger.error(error);
    }

    return null;
}

export function authDataFromApi(req: NextApiRequest): AuthData | null {
    try {
        if (req.cookies[COOKIE_AUTH_DATA]) {
            return JSON.parse(req.cookies[COOKIE_AUTH_DATA]);
        }
    } catch (error) {
        logger.error(error);
    }

    return null;
}

export const getClientInfo = (context: GetServerSidePropsContext): ClientInfo => {
    const clientIp = (context.req.headers["x-real-ip"] || context.req.headers['x-forwarded-for'] || context.req.socket.remoteAddress || '') as string;
    const userAgent = context.req.headers['user-agent'] || '';
    const authData = authDataFromContext(context);
    const locale = context.locale ?? 'id';

    return { locale, clientIp, userAgent, authData }
}
