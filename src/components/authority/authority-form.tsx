import { translate } from '@/libs/validation-util';
import { createAuthority, updateAuthority } from '@/services/authority-service';
import { Authority, AuthorityFormData } from '@/types/authority-type';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateAuthoritySchema, UpdateAuthoritySchema } from '@/validations/authority-schema';
import axios, { AxiosError, AxiosResponse } from 'axios';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';
import { errorHandler } from '@/libs/axios-util';
import { useAppContext } from '@/providers/app-context';

type Props = {
    authority: AuthorityFormData,
    clientInfo: ClientInfo
}

export default function AuthorityForm({ authority, clientInfo }: Props) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const { register, handleSubmit } = useForm<Authority>({ defaultValues: authority });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<Authority> = async (data) => {
        try {
            setValidationErrors({});
            setMessageError(null);

            const validation = (authority?.id) ? UpdateAuthoritySchema.safeParse(data) : CreateAuthoritySchema.safeParse(data);

            if (validation.success) {
                setLoading(true);
                const response = (authority?.id) ? (await updateAuthority(authority.id, validation.data, clientInfo)) : (await createAuthority(validation.data, clientInfo));
                setTimeout(() => handleResponse(response), 500);
            } else {
                setValidationErrors(translate(validation.error.issues, t));
            }


        } catch (error: any) {
            errorHandler(setMessageError, i18n.language, error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    const handleResponse = (response: AxiosResponse) => {
        if (response.status === 201) {
            router.push('/data/authority');
        } else if (response.status === 200) {
            router.push(`/data/authority/${authority?.id}`);
        } else if (response.status === 400) {
            setValidationErrors(translate(response.data, t));
        } else if (response.status === 409) {
            setMessageError(response.data);
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                {authority ?
                    <BreadCrumb
                        items={[
                            { label: t('authority'), url: `/data/authority/${authority.id}` },
                            { label: t('update') }
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
                    <MessageErrorBox messageError={messageError} />
                    <form
                        className='w-full'
                        onSubmit={handleSubmit(onSubmit)}
                        method='post'
                        noValidate
                        autoComplete='off' >

                        <div className="form-group">
                            <label className='form-label' htmlFor="code">{t('code')}</label>
                            <div className='w-full bg-stone-200'>
                                <input
                                    className={clsx('w-[80px]', validationErrors.code && 'border-red-400')}
                                    type="text"
                                    placeholder='xxx'
                                    maxLength={5}
                                    {...register("code")}
                                />
                            </div>
                            <ValidationError message={validationErrors.code} />
                        </div>

                        <div className="form-group">
                            <label className="form-label" htmlFor="name">{t('description')}</label>
                            <input
                                className={clsx('w-full', validationErrors.code && 'border-red-400')}
                                type="text"
                                placeholder='xxx'
                                maxLength={50}
                                {...register("description")}
                            />
                            <ValidationError message={validationErrors.description} />
                        </div>

                        <div className="mt-5 text-center flex gap-1 max-w-[350px]">
                            <button
                                onClick={() => router.push(authority.id ? `/data/authority/${authority.id}` : '/data/authority')}
                                type='button'
                                className="w-full btn btn-secondary">
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