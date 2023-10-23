import { COOKIE_AUTHORITIES, COOKIE_TOKEN, COOKIE_USERNAME } from '@/configs/constant';
import { revokeToken } from '@/services/auth-service';
import { deleteCookie, getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        try {
            const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            const userAgent = req.headers['user-agent'] || '';
            const token = req.cookies[COOKIE_TOKEN];

            if (token) {
                deleteCookie(COOKIE_TOKEN, { req, res, path: '/' });
                deleteCookie(COOKIE_USERNAME, { req, res, path: '/' });
                deleteCookie(COOKIE_AUTHORITIES, { req, res, path: '/' });
                await revokeToken({locale: 'id', clientIp: clientIp as string, userAgent, token: token as string });
            }

            res.redirect("/login?message=logoutSuccessfully")

        } catch (error: any) {
            res.redirect("/login?message=" + error.message)
        }

    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;