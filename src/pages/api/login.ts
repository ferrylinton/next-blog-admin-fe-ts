import { COOKIE_AUTH_DATA } from '@/configs/constant';
import { getToken } from '@/services/auth-service';
import { ClientInfo } from '@/types/common-type';
import { setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { username, password, locale } = req.body;

        try {
            const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            const userAgent = req.headers['user-agent'] || '';
            const clientInfo: ClientInfo = { clientIp: clientIp as string, locale, userAgent, authData: null };

            const response = await getToken(username, password, clientInfo);

            if (response.status !== 200) {
                res.redirect(locale === 'en' ? "/en/login?message=invalidUsernameOrPassword" : "/login?message=invalidUsernameOrPassword");
            } else {
                const option: OptionsType = {
                    req,
                    res,
                    httpOnly: true,
                    secure: process.env.NODE_ENV !== 'development',
                    sameSite: 'strict',
                    path: "/",
                    maxAge: 1 * 60 * 1000
                };

                setCookie(COOKIE_AUTH_DATA, response.data, option);
                res.redirect(locale === 'en' ? "/en/" : "/");
            }
        } catch (error: any) {
            res.redirect(locale === 'en' ? `/en/login?message=${error.message}` : `/login?message=${error.message}`);
        }


    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;