import { handleError } from '@/libs/axios-util';
import { translate } from '@/libs/validation-util';
import { useAppContext } from '@/providers/app-context';
import { createTag, updateTag } from '@/services/tag-service';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { TagFormData } from '@/types/tag-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateTagSchema, UpdateTagSchema } from '@/validations/tag-schema';
import { AxiosResponse } from 'axios';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';

type Props = {
    tag: TagFormData,
    clientInfo: ClientInfo
}

export default function TagForm({ tag, clientInfo }: Props) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const { register, handleSubmit } = useForm<TagFormData>({ defaultValues: tag });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<TagFormData> = async (data) => {
        try {
            setValidationErrors({});
            setMessageError(null);

            const validation = (tag?.id) ? UpdateTagSchema.safeParse(data) : CreateTagSchema.safeParse(data);

            if (validation.success) {
                setLoading(true);
                const response = (tag?.id) ? (await updateTag(tag.id, validation.data, clientInfo)) : (await createTag(validation.data, clientInfo));
                setTimeout(() => handleResponse(response), 500);
            } else {
                setValidationErrors(translate(validation.error.issues, t));
            }

        } catch (error: any) {
            handleError(setMessageError, i18n.language, error);
        } finally {
            setTimeout(() => setLoading(false), 500);
        }
    };

    const handleResponse = (response: AxiosResponse) => {
        if (response.status === 201) {
            router.push('/data/tag');
        } else if (response.status === 200) {
            router.push(`/data/tag/${tag?.id}`);
        } else if (response.status === 400) {
            setValidationErrors(translate(response.data, t));
        } else if (response.status === 409) {
            setMessageError(response.data);
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                {tag.id ?
                    <BreadCrumb
                        items={[
                            { label: t('tag'), url: `/data/tag/${tag.id}` },
                            { label: t('update') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('tag'), url: `/data/tag` },
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
                            <label className='form-label' htmlFor="name">{t('name')}</label>
                            <input
                                className={clsx('w-full', validationErrors.name && 'border-red-400')}
                                type="text"
                                placeholder='xxx'
                                maxLength={30}
                                {...register("name")}
                            />
                            <ValidationError message={validationErrors.name} />
                        </div>

                        <div className="mt-5 text-center flex gap-1 max-w-[350px]">
                            <button
                                onClick={() => router.push(tag.id ? `/data/tag/${tag.id}` : '/data/tag')}
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