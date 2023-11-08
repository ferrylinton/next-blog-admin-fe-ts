import { COOKIE_AUTH_DATA } from '@/configs/constant';
import { authDataFromApi } from '@/libs/auth-data-util';
import { revokeToken } from '@/services/auth-service';
import { deleteCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        const { locale } = req.body;
        
        try {
            const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            const userAgent = req.headers['user-agent'] || '';
            const authData = authDataFromApi(req);

            if (authData) {
                await revokeToken({ locale, clientIp: clientIp as string, userAgent, authData });
            }

            deleteCookie(COOKIE_AUTH_DATA, { req, res, path: '/' });
            res.redirect(locale === 'en' ? `/en/login?message=logoutSuccessfully` : `/login?message=logoutSuccessfully`);
        } catch (error: any) {
            res.redirect(locale === 'en' ? `/en/login?message=${error.message}` : `/login?message=${error.message}`)
        }

    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;