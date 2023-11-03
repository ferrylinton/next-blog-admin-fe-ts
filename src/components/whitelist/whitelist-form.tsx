import { translate } from '@/libs/validation-util';
import { createWhitelist, updateWhitelist } from '@/services/whitelist-service';
import { Whitelist, WhitelistFormData } from '@/types/whitelist-type';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateWhitelistSchema, UpdateWhitelistSchema } from '@/validations/whitelist-schema';
import axios, { AxiosError } from 'axios';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';

type Props = {
    whitelist: WhitelistFormData,
    clientInfo: ClientInfo
}

export default function WhitelistForm({ whitelist, clientInfo }: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const { register, handleSubmit } = useForm<Whitelist>({ defaultValues: whitelist });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<Whitelist> = async (data) => {
        try {
            setValidationErrors({});
            setMessageError(null);
            const validation = (whitelist?.id) ? UpdateWhitelistSchema.safeParse(data) : CreateWhitelistSchema.safeParse(data);

            if (validation.success) {
                const response = (whitelist?.id) ? (await updateWhitelist(whitelist.id, validation.data, clientInfo)) : (await createWhitelist(validation.data, clientInfo));

                if (response.status === 201) {
                    router.push('/data/whitelist');
                } else if (response.status === 200) {
                    router.push(`/data/whitelist/${whitelist?.id}`);
                } else if (response.status === 400) {
                    setValidationErrors(translate(response.data, t));
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
                {whitelist ?
                    <BreadCrumb
                        items={[
                            { label: t('whitelist'), url: `/data/whitelist/${whitelist.id}` },
                            { label: t('update') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('whitelist'), url: `/data/whitelist` },
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
                            <label className='form-label' htmlFor="ip">{t('ip')}</label>
                            <div className='w-full bg-stone-200'>
                                <input
                                    className={clsx('w-[200px]', validationErrors.ip && 'border-red-400')}
                                    type="text"
                                    placeholder='xxx'
                                    maxLength={20}
                                    {...register("ip")}
                                />
                            </div>
                            <ValidationError message={validationErrors.ip} />
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
                                onClick={() => router.push(whitelist.id ? `/data/whitelist/${whitelist.id}` : '/data/whitelist')}
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