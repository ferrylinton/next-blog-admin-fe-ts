import MessageErrorBox from '@/components/MessageErrorBox';
import ValidationError from '@/components/ValidationError';
import { translate } from '@/libs/validation-util';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { AuthenticateSchema, AuthenticateType } from '@/validations/authenticate-schema';
import clsx from 'clsx';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Righteous } from 'next/font/google';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


const logoFont = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function LoginPage() {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const message = router.query?.message as string;

    const formRef = useRef<HTMLFormElement>(null);

    const { register, handleSubmit } = useForm<AuthenticateType>({
        defaultValues: {
            username: "admin111",
            password: "admin111"
        }
    });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<AuthenticateType> = async (data) => {
        try {
            setValidationErrors({});
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
        <div className='w-full h-full grow flex flex-col justify-center items-center px-2 pb-5'>
            <div className={`uppercase leading-none text-2xl text-[#333] tracking-wider sm:text-3xl mb-4  ${logoFont.className}`}>
                <span className='drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>{t('login')}</span>
            </div>

            <form
                ref={formRef} 
                className='w-full sm:w-[350px] flex flex-col gap-4 sm:border border-stone-200 px-6 py-9'
                noValidate
                autoComplete='off'
                onSubmit={handleSubmit(onSubmit)}
                method='post'
                action={'/api/login'}>

                {message && <div className='w-full text-center text-red-500 pb-4'>{t(message)}</div>}
                <MessageErrorBox messageError={messageError} />

                <div className="form-group">
                    <label className="form-label" htmlFor="username">{t('username')}</label>
                    <input
                        className={clsx('w-full', validationErrors.code && 'border-red-400')}
                        type="text"
                        placeholder="xxx"
                        maxLength={100}
                        {...register("username")}
                    />
                    <ValidationError message={validationErrors.username} />
                </div>

                <div className="form-group">
                    <label className="form-label" htmlFor="password">{t('password')}</label>
                    <input
                        className={`w-full`}
                        type="password"
                        placeholder="xxx"
                        maxLength={100}
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
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);

    return {
        props: {
            ...props
        },
    };
}
