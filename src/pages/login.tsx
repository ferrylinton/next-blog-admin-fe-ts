import { checkToken } from '@/services/auth-service';
import { AuthData } from '@/types/auth-type';
import { deleteCookie, getCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Righteous } from 'next/font/google';
import { useRouter } from 'next/router';
import { useState } from 'react';


const logoFont = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function LoginPage() {

    const router = useRouter();

    const message = router.query?.message as string;

    const [state, setState] = useState({
        username: "admin111",
        password: "admin111"
    });

    const onFieldChange = (event: any) => {
        let value = event.target.value;
        setState({ ...state, [event.target.name]: value });
    };

    return (
        <div className='w-full h-full grow flex flex-col justify-center items-center px-2 pb-5'>
            <div className={`uppercase leading-none text-2xl text-[#333] tracking-wider sm:text-3xl mb-4  ${logoFont.className}`}>
                <span className='drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>login</span>
            </div>

            <form
                className='w-full sm:w-[350px] flex flex-col gap-4 sm:border border-stone-200 px-6 py-9'
                noValidate
                autoComplete='off'
                method='POST'
                action={'/api/login'}>

                {message && <div className='w-full text-center text-red-500 pb-4'>{message}</div>}

                <input
                    className={`w-full p-3 text-sm leading-tight border border-stone-200 focus:outline-none focus:ring-4 ring-lime-200`}
                    type="text"
                    placeholder="Username"
                    name='username'
                    value={state.username}
                    maxLength={50}
                    onChange={onFieldChange}
                />

                <input
                    className={`w-full p-3 text-sm leading-tight border border-stone-200 focus:outline-none focus:ring-4 ring-lime-200`}
                    type="password"
                    placeholder="Password"
                    name='password'
                    value={state.password}
                    maxLength={50}
                    onChange={onFieldChange}
                />

                <button type="submit" className='btn btn-primary'>
                    <span className={`text-lg tracking-wider ${logoFont.className}`}>Login</span>
                </button>
            </form>
        </div>
    )
}

export const getServerSideProps = async ({ locale, req, res }: GetServerSidePropsContext) => {
    const props = await serverSideTranslations(locale ?? 'id', ['common']);
    const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    return {
        props: {
            clientIp,
            userAgent,
            ...props
        },
    };
}
