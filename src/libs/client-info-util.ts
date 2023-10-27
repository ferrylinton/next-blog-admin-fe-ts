import { COOKIE_TOKEN } from "@/configs/constant";
import { ClientInfo } from "@/types/common-type";
import { GetServerSidePropsContext } from "next";

export const getClientInfo = ({ req, locale }: GetServerSidePropsContext): ClientInfo => {

    const clientIp = (req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;
    const userAgent = req.headers['user-agent'] || '';
    const token = req.cookies[COOKIE_TOKEN] || '';

    return { locale, clientIp, userAgent, token }
}