import { COOKIE_TOKEN } from '@/configs/constant';
import { getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';


export const getTokenFromContext = ({ req, res }: GetServerSidePropsContext) => {
    const token = getCookie(COOKIE_TOKEN,
        {
            req,
            res,
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            sameSite: 'strict',
            path: "/",
        });

    if (token) {
        return token;
    } else {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
}