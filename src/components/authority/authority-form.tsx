import { translate } from '@/libs/validation-util';
import { createAuthority, updateAuthority } from '@/services/authority-service';
import { AuthorityForm, AuthorityProps } from '@/types/authority-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateAuthoritySchema, UpdateAuthoritySchema } from '@/validations/authority-schema';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import BreadCrumb from '../BreadCrumb';


export default function AuthorityForm({ authority, clientInfo }: AuthorityProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const [data, setData] = useState<AuthorityForm>(authority || {});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault();
            const validation = (authority?.id) ? UpdateAuthoritySchema.safeParse(data) : CreateAuthoritySchema.safeParse(data);

            if (validation.success) {
                const response = (authority?.id) ? (await updateAuthority(authority.id, validation.data, clientInfo)) : (await createAuthority(validation.data, clientInfo));

                if (response.status === 201) {
                    router.push('/data/authority');
                } else if (response.status === 200) {
                    router.push(`/data/authority/${authority?.id}`);
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
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError;
                if (axiosError.response?.data) {
                    setMessageError(axiosError.response?.data as MessageError);
                } else {
                    setMessageError({ message: axiosError.message });
                }
            } else {
                setMessageError({ message: error.message })
            }

        }
    };



    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                {authority ?
                    <BreadCrumb
                        items={[
                            { label: t('authority'), url: `/data/authority/${authority.id}` },
                            { label: t('modify') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('authority'), url: `/data/authority` },
                            { label: t('add') }
                        ]} />
                }
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='form'>
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

                        <div className="form-group">
                            <label className='form-label' htmlFor="code">{t('code')}</label>
                            <div className='w-full bg-stone-200'>
                                <input
                                    className={`w-[80px] form-input ${validationErrors.code ? 'border-red-400' : 'border-stone-300'}`}
                                    name='code'
                                    type="text"
                                    placeholder='xxx'
                                    maxLength={5}
                                    value={data.code}
                                    onChange={handleChange}
                                />
                            </div>
                            {validationErrors.code && <div className="form-error-label"> {validationErrors.code} </div>}
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="name">{t('description')}</label>
                            <input
                                className={`w-full form-input ${validationErrors.description ? 'border-red-400' : 'border-stone-300'}`}
                                name='description'
                                type="text"
                                placeholder='xxx'
                                maxLength={50}
                                value={data.description}
                                onChange={handleChange}
                            />
                            {validationErrors.description && <div className="form-error-label"> {validationErrors.description} </div>}
                        </div>

                        <div className="mt-5 text-center flex gap-1">
                            <button
                                onClick={() => router.push(authority ? `/data/authority/${authority.id}` : '/data/authority')}
                                type='button'
                                className="w-full btn">
                                <span>{t('cancel')}</span>
                            </button>

                            <button
                                type="submit"
                                className="w-full btn btn-primary">
                                <span>{t('save')}</span>
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}