import { translate } from '@/libs/validation-util';
import { changePassword } from '@/services/user-service';
import { MessageError } from '@/types/response-type';
import { UserFormData } from '@/types/user-type';
import { ErrorValidation } from '@/types/validation-type';
import { ChangePasswordSchema } from '@/validations/user-schema';
import axios, { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';
import { ClientInfo } from '@/types/common-type';

type Props = {
    id?: string,
    username?: string,
    clientInfo: ClientInfo
}


export default function ChangePasswordForm({ id, username, clientInfo }: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const { register, handleSubmit } = useForm<UserFormData>({ defaultValues: { password: '', passwordConfirm: '' } });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        try {
            const validation = ChangePasswordSchema.safeParse(data);

            if (validation.success) {
                const response = await changePassword({ id, username, ...validation.data }, clientInfo);

                if (response.status === 200) {
                    if(id){
                        router.push(`/data/user/${id}`);
                    }else{
                        router.push(`/profile`);
                    }
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
                {id ?
                    <BreadCrumb
                        items={[
                            { label: t('user'), url: `/data/user/${id}` },
                            { label: t('changePassword') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('changePassword') }
                        ]} />
                }
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='form'>
                    <MessageErrorBox messageError={messageError} />
                    <form
                        className='w-full'
                        onSubmit={handleSubmit(onSubmit)}
                        noValidate
                        autoComplete='off' >



                        <div className="form-group">
                            <label className='form-label' htmlFor="password">{t('password')}</label>
                            <input
                                className={`w-full form-input ${validationErrors['password'] ? 'border-red-400' : 'border-stone-300'}`}
                                type="text"
                                placeholder='xxx'
                                maxLength={100}
                                {...register("password")}
                            />
                            <ValidationError message={validationErrors.password} />
                        </div>

                        <div className="form-group">
                            <label className='form-label' htmlFor="passwordConfirm">{t('passwordConfirm')}</label>
                            <input
                                className={`w-full form-input ${validationErrors['passwordConfirm'] ? 'border-red-400' : 'border-stone-300'}`}
                                type="text"
                                placeholder='xxx'
                                maxLength={100}
                                {...register("passwordConfirm")}
                            />
                            <ValidationError message={validationErrors.passwordConfirm} />
                        </div>

                        <div className="mt-5 max-w-[400px] text-center flex gap-1">
                            {id && <button
                                onClick={() => router.push(`/data/user/${id}`)}
                                type='button'
                                className="w-full btn btn-secondary">
                                <span>{t('cancel')}</span>
                            </button>}

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