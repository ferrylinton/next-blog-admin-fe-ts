import { COOKIE_TOKEN } from '@/configs/constant';
import { createAuthority } from '@/services/authority-service';
import { AuthData } from '@/types/auth-type';
import { AxiosError } from 'axios';
import { getCookie } from 'cookies-next';
import type { NextApiRequest, NextApiResponse } from 'next';


const handler = async (req: NextApiRequest, res: NextApiResponse) => {

    if (req.method === 'POST') {
        try {
            const token = req.cookies[COOKIE_TOKEN];
            const { code, description } = req.body;

            res.redirect("/data/authority")

        } catch (error: any) {
            console.log(error);
            if (error instanceof AxiosError) {
                const { data, status, config } = error.response!;
                switch (status) {
                    case 400:
                        console.error(data);
                        break;

                    case 401:
                        console.error('unauthorised');
                        break;

                    case 404:
                        console.error(`${config.baseURL}${config.url} is not found`);
                        break;
                }
            }

            res.redirect("/data/authority/form?message=" + error.message)
        }


    } else {
        return res.status(405).json({ message: `${req.method} Not Allowed` });
    }
}

export default handler;