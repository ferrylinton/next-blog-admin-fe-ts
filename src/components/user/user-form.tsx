import { translate } from '@/libs/validation-util';
import { createUser, updateUser } from '@/services/user-service';
import { MessageError } from '@/types/response-type';
import { UserFormData, UserFormProps } from '@/types/user-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateUserSchema, UpdateUserSchema } from '@/validations/user-schema';
import axios, { AxiosError } from 'axios';
import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';



export default function UserForm({ user, authorities, clientInfo }: UserFormProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const { register, handleSubmit } = useForm<UserFormData>({ defaultValues: user });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<UserFormData> = async (data) => {
        try {
            const {password, passwordConfirm, ...newData} = data;console.log(data);
            const validation = (user?.id) ? UpdateUserSchema.safeParse(newData) : CreateUserSchema.safeParse(newData);

            if (validation.success) {
                const response = (user?.id) ? (await updateUser(user.id, validation.data, clientInfo)) : (await createUser(validation.data, clientInfo));

                if (response.status === 201) {
                    router.push('/data/user');
                } else if (response.status === 200) {
                    router.push(`/data/user/${user?.id}`);
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
                {user ?
                    <BreadCrumb
                        items={[
                            { label: t('user'), url: `/data/user/${user.id}` },
                            { label: t('update') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('user'), url: `/data/user` },
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
                        noValidate
                        autoComplete='off' >

                        <div className="form-group">
                            <label className='form-label' htmlFor="username">{t('username')}</label>
                            <input
                                className={`w-full form-input ${validationErrors['username'] ? 'border-red-400' : 'border-stone-300'}`}
                                type="text"
                                placeholder='xxx'
                                maxLength={100}
                                {...register("username")}
                            />
                            <ValidationError message={validationErrors.username} />
                        </div>

                        <div className="form-group">
                            <label className='form-label' htmlFor="email">{t('email')}</label>
                            <input
                                className={`w-full form-input ${validationErrors['email'] ? 'border-red-400' : 'border-stone-300'}`}
                                type="text"
                                placeholder='xxx'
                                maxLength={100}
                                {...register("email")}
                            />
                            <ValidationError message={validationErrors.email} />
                        </div>

                        {!user.id && <div className="form-group">
                            <label className='form-label' htmlFor="password">{t('password')}</label>
                            <input
                                className={`w-full form-input ${validationErrors['password'] ? 'border-red-400' : 'border-stone-300'}`}
                                type="text"
                                placeholder='xxx'
                                maxLength={100}
                                {...register("password")}
                            />
                            <ValidationError message={validationErrors.password} />
                        </div>}

                        {!user.id && <div className="form-group">
                            <label className='form-label' htmlFor="passwordConfirm">{t('passwordConfirm')}</label>
                            <input
                                className={`w-full form-input ${validationErrors['passwordConfirm'] ? 'border-red-400' : 'border-stone-300'}`}
                                type="text"
                                placeholder='xxx'
                                maxLength={100}
                                {...register("passwordConfirm")}
                            />
                            <ValidationError message={validationErrors.passwordConfirm} />
                        </div>}

                        <div className="form-group">
                            <label className='form-label' htmlFor="loginAttempt">{t('loginAttempt')}</label>
                            <div className='w-full bg-stone-200'>
                                <input
                                    className={clsx('w-[80px]', validationErrors.loginAttempt && 'border-red-400')}
                                    type="number"
                                    placeholder='xxx'
                                    maxLength={5}
                                    {...register("loginAttempt")}
                                />
                            </div>
                            <ValidationError message={validationErrors.loginAttempt} />
                        </div>

                        <div className="form-group flex gap-3 justify-start items-center">
                            <input
                                type="checkbox"
                                {...register("activated")}
                            />
                            <label className="hover:cursor-pointer text-xs">
                                {t('activated')}
                            </label>
                        </div>

                        <div className="form-group flex gap-3 justify-start items-center">
                            <input
                                type="checkbox"
                                {...register("locked")}
                            />
                            <label className="hover:cursor-pointer text-xs">
                                {t('locked')}
                            </label>
                        </div>

                        <div className="mb-5">
                            <label className="block mb-1 text-xs ps-1" htmlFor="name">{t('authorities')}</label>
                            <div className={`flex justify-start flex-wrap gap-5 border p-4 ${validationErrors.authorities ? 'border-red-400' : 'border-stone-300'}`}>
                                {
                                    authorities.map((authority, _index) => {
                                        return <div
                                            className="flex gap-1 justify-start items-center"
                                            key={authority.id}>
                                            <input
                                                type="checkbox"
                                                value={authority.code}
                                                {...register("authorities")}
                                            />
                                            <label className="hover:cursor-pointer text-xs">
                                                {authority.description}
                                            </label>
                                        </div>
                                    })
                                }
                            </div>
                            <ValidationError message={validationErrors.authorities} />
                        </div>



                        <div className="mt-5 max-w-[400px] text-center flex gap-1">
                            <button
                                onClick={() => router.push(user ? `/data/user/${user.id}` : '/data/user')}
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