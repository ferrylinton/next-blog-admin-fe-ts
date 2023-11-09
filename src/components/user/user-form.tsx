import { translate } from '@/libs/validation-util';
import { createUser, updateUser } from '@/services/user-service';
import { MessageError } from '@/types/response-type';
import { UserFormData, UserFormProps } from '@/types/user-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreateUserSchema, UpdateUserSchema } from '@/validations/user-schema';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { clsx } from 'clsx';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';
import { useAppContext } from '@/providers/app-context';
import { handleError } from '@/libs/axios-util';



export default function UserForm({ user, authorities, clientInfo }: UserFormProps) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const { register, handleSubmit } = useForm<UserFormData>({ defaultValues: user });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<UserFormData> = async (createData) => {
        try {
            const { password, passwordConfirm, ...updateData } = createData;
            const validation = (user?.id) ? UpdateUserSchema.safeParse(updateData) : CreateUserSchema.safeParse(createData);

            if (validation.success) {
                setLoading(true);
                const response = (user?.id) ? (await updateUser(user.id, validation.data, clientInfo)) : (await createUser(validation.data, clientInfo));
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
            router.push('/data/user');
        } else if (response.status === 200) {
            router.push(`/data/user/${user?.id}`);
        } else if (response.status === 400) {
            setValidationErrors(translate(response.data, t));
        } else if (response.status === 409) {
            setMessageError(response.data);
        }
    }

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

                        {user.id && <div className="form-group">
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
                        </div>}

                        <div className="form-group flex gap-3 justify-start items-center">
                            <input
                                type="checkbox"
                                {...register("activated")}
                            />
                            <label className="hover:cursor-pointer text-xs">
                                {t('activated')}
                            </label>
                        </div>

                        {user.id && <div className="form-group flex gap-3 justify-start items-center">
                            <input
                                type="checkbox"
                                {...register("locked")}
                            />
                            <label className="hover:cursor-pointer text-xs">
                                {t('locked')}
                            </label>
                        </div>}

                        <div className="mb-5">
                            <label className="block mb-1 text-xs ps-1" htmlFor="name">{t('authorities')}</label>
                            <div className={`flex justify-start flex-wrap gap-4 border p-2 ${validationErrors.authorities ? 'border-red-400' : 'border-stone-300'}`}>
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
                                            <label className="hover:cursor-pointer text-xs min-w-[170px]">
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