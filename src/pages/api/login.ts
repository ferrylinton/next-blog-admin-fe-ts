import { COOKIE_AUTHORITIES, COOKIE_TOKEN, COOKIE_USERNAME } from '@/configs/constant';
import { getToken } from '@/services/auth-service';
import { AxiosError } from 'axios';
import { setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    
    if (req.method === 'POST') {
        try {
            const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            const userAgent = req.headers['user-agent'] || '';
            const { username, password } = req.body;
            const { data } = await getToken(username, password, clientIp as string, userAgent);
            const option: OptionsType = {
                req,
                res,
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                sameSite: 'strict',
                path: "/",
                maxAge: 1 * 60 * 1000
            };

            setCookie(COOKIE_TOKEN, data.token, option);
            setCookie(COOKIE_USERNAME, username, option);
            setCookie(COOKIE_AUTHORITIES, data.authorities, option);

            res.redirect("/");

        } catch (error: any) {
            if (error instanceof AxiosError) {
                const { data, status, config } = error.response!;
                switch (status) {
                    case 400:
                        console.error(data);
                        break;

                    case 403:
                        console.error(error.message);
                        break;

                    case 404:
                        console.error(`${config.baseURL}${config.url} is not found`);
                        break;
                }
            }
            res.redirect("/login?message=Invalid username or password")
        }


    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;