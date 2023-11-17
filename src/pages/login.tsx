import MessageErrorBox from '@/components/MessageErrorBox';
import ValidationError from '@/components/ValidationError';
import { COOKIE_AUTH_DATA } from '@/configs/constant';
import { logger } from '@/configs/winston';
import { getClientInfo } from '@/libs/auth-data-util';
import { translate } from '@/libs/validation-util';
import { checkToken } from '@/services/auth-service';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { AuthenticateSchema, AuthenticateType } from '@/validations/authenticate-schema';
import axios from 'axios';
import clsx from 'clsx';
import { deleteCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Righteous } from 'next/font/google';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


const logoFont = Righteous({
    weight: "400",
    subsets: ['latin']
});

type Props = {
    clientInfo?: ClientInfo
}

export default function LoginPage({ clientInfo }: Props) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const message = router.query?.message as string;

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (clientInfo) {
            router.push('/');
        }
    })

    const { register, handleSubmit } = useForm<AuthenticateType>({
        defaultValues: {
            username: "",
            password: ""
        }
    });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>({ message: t(message) });

    const onSubmit: SubmitHandler<AuthenticateType> = async (data) => {
        try {
            setValidationErrors({});
            setMessageError(null);
            const validation = AuthenticateSchema.safeParse(data);
            if (validation.success) {
                formRef.current?.submit();
            } else {
                setValidationErrors(translate(validation.error.issues, t));
            }

        } catch (error: any) {
            setMessageError({ message: error.message })
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-center items-center px-2 pt-[50px] pb-5'>
            <div className={`uppercase leading-none text-2xl text-[#333] tracking-wider sm:text-3xl mb-4  ${logoFont.className}`}>
                <span className='drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{t('login')}</span>
            </div>

            <form
                ref={formRef}
                className='w-full sm:w-[400px] flex flex-col gap-4 sm:border border-stone-200 px-6 py-9'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
                method='post'
                action={'/api/login'}>

                <MessageErrorBox messageError={messageError} />

                <div className="form-group">
                    <label className="form-label" htmlFor="username">{t('username')}</label>
                    <input
                        id='username'
                        autoComplete='false'
                        className={clsx('w-full', validationErrors.code && 'border-red-400')}
                        type="text"
                        placeholder="xxx"
                        maxLength={30}
                        {...register("username")}
                    />
                    <ValidationError message={validationErrors.username} />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">{t('password')}</label>
                    <input
                        id='password'
                        autoComplete='false'
                        className={`w-full`}
                        type="password"
                        placeholder="xxx"
                        maxLength={30}
                        {...register("password")}
                    />
                    <ValidationError message={validationErrors.password} />
                </div>

                <input type='hidden' id='locale' name='locale' value={i18n.language}></input>

                <button type="submit" className='btn btn-primary'>
                    <span>Login</span>
                </button>
            </form>
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const ssrConfig = await serverSideTranslations(context.locale ?? 'id', ['common']);

    try {
        await checkToken(clientInfo);

        return {
            props: {
                clientInfo,
                ...ssrConfig
            }
        }
    } catch (error: any) {
        logger.error(error);
        const messageError: MessageError = { message: error.message }

        if (axios.isAxiosError(error)) {
            const response = error?.response;
            if (response && response.status === 401) {
                deleteCookie(COOKIE_AUTH_DATA, { req: context.req, res: context.res, path: '/' });
            }
        }

        return {
            props: {
                messageError,
                ...ssrConfig
            }
        }
    }
}
