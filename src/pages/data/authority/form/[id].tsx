import { COOKIE_TOKEN } from '@/configs/constant';
import BreadcrumbIcon from '@/icons/BredcrumbIcon';
import HomeIcon from '@/icons/HomeIcon';
import { translate } from '@/libs/validation-util';
import { getAuthority, updateAuthority } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateAuthority, UpdateAuthoritySchema } from '@/validations/authority-schema';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from 'react';

type Props = {
    authority: Authority
} & ClientInfo

export default function AuthorityUpdatePage({authority, ...clientInfo}: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const [data, setData] = useState<Partial<Partial<CreateAuthority>>>({code: authority.code, description: authority.description});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const validation = UpdateAuthoritySchema.safeParse(data);
            
            if (validation.success) {
                const response = await updateAuthority(authority.id, validation.data, clientInfo);
                if (response.status === 200) {
                    router.push('/data/authority/');
                } else if (response.status === 400) {
                    setValidationErrors(response.data);
                } else if (response.status === 409) {
                    setMessageError(response.data);
                } else if (response.status === 401) {
                    router.push('/login?status=401');
                } else if (response.status === 403) {
                    router.push('/login?status=403');
                }
            } else {
                setValidationErrors(translate(validation.error.issues, t));
            }


        } catch (error: any) {
            setMessageError(error.message);
        }
    };



    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-start  items-center h-[40px] px-2 flex-wrap">
                    <Link href="/" className="h-full flex items-center px-2">
                        <HomeIcon className='w-5 h-5' />
                    </Link>
                    <div className='h-full flex items-center px-2'>
                        <BreadcrumbIcon className='w-3 h-3' />
                    </div>
                    <div className='h-full flex items-center px-2 uppercase'>
                        <span className='leading-none'>Authority</span>
                    </div>
                </div>
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='flex flex-col justify-center items-center w-full max-w-md sm:border border-stone-300 mx-4 my-8 sm:mx-0 px-5 py-8 '>
                    {
                        messageError && <div className='w-full border border-red-300 bg-red-50 px-3 py-2 mb-8 text-sm flex flex-col text-red-500'>
                            {messageError.message}
                        </div>
                    }
                    <form
                        className='w-full'
                        onSubmit={handleSubmit}
                        method='post'
                        noValidate
                        autoComplete='off' >

                        <div className="mb-8">
                            <label className="block mb-2 text-xs" htmlFor="name">Code</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${validationErrors.code ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                id="code"
                                name='code'
                                type="text"
                                placeholder="CODE"
                                minLength={5}
                                maxLength={5}
                                value={data.code}
                                onChange={handleChange}
                            />
                            {validationErrors.code && (
                                <p className="text-xs text-red-500 mt-2">
                                    {validationErrors.code}
                                </p>
                            )}
                        </div>

                        <div className="mb-8">
                            <label className="block mb-2 text-sm" htmlFor="name">Description</label>
                            <input
                                className={`w-full p-3 text-sm leading-tight border ${validationErrors.description ? 'border-red-500' : 'border-slate-400'} rounded appearance-none focus:outline-none focus:ring-4`}
                                id="description"
                                name='description'
                                type="text"
                                placeholder="Description"
                                maxLength={50}
                                value={data.description}
                                onChange={handleChange}
                            />
                            {validationErrors.description && (
                                <p className="text-xs text-red-500 mt-2">
                                    {validationErrors.description}
                                </p>
                            )}
                        </div>

                        <div className="mt-5 text-center flex gap-1">
                            <button
                                onClick={() => router.push('/data/authority')}
                                type='button'
                                className="w-full btn btn-default">
                                <span className='font-semibold'>Cancel</span>
                            </button>

                            <button
                                type="submit"
                                className="w-full btn btn-primary">
                                <span className='font-semibold'>Save</span>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export const getServerSideProps = withAuth(async ({ req, params, locale }: GetServerSidePropsContext) => {
    const id = params?.id as string;
    const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const token = req.cookies[COOKIE_TOKEN];
    const { data } = await getAuthority(id, { locale: locale || 'id', clientIp: clientIp as string, userAgent, token: token as string });
    
    return {
        props: {
            namespaces: ['common', 'authority'],
            authority: data
        }
    }
})