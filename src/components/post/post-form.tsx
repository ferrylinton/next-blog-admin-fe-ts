import { translate } from '@/libs/validation-util';
import { createPost, updatePost } from '@/services/post-service';
import { PostFormProps } from '@/types/post-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreatePostSchema, UpdatePostSchema } from '@/validations/post-schema';
import * as Tabs from '@radix-ui/react-tabs';
import axios, { AxiosError } from 'axios';
import { flatten, unflatten } from 'flat';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';

type FlatPost = {
    [key: string]: string
}

export default function PostForm({ post, tags, clientInfo }: PostFormProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const { register, handleSubmit } = useForm<FlatPost>({ defaultValues: flatten(post, { safe: true }) });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<FlatPost> = async (data) => {
        try {
            const validation = (post?.id) ? UpdatePostSchema.safeParse(unflatten(data)) : CreatePostSchema.safeParse(unflatten(data));
            
            if (validation.success) {
                const response = (post?.id) ? (await updatePost(post.id, validation.data, clientInfo)) : (await createPost(validation.data, clientInfo));

                if (response.status === 201) {
                    router.push('/data/post');
                } else if (response.status === 200) {
                    router.push(`/data/post/${post?.id}`);
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
                {post ?
                    <BreadCrumb
                        items={[
                            { label: t('post'), url: `/data/post/${post.id}` },
                            { label: t('modify') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('post'), url: `/data/post` },
                            { label: t('add') }
                        ]} />
                }
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>

                {
                    messageError && <div className='w-full border border-red-300 bg-red-50 px-3 py-2 mb-8 text-sm flex flex-col text-red-500'>
                        {messageError.message}
                    </div>
                }
                <form
                    className='w-full'
                    onSubmit={handleSubmit(onSubmit)}
                    method='post'
                    noValidate
                    autoComplete='off' >

                    <div className="form-group">
                        <label className='form-label' htmlFor="slug">{t('slug')}</label>
                        <input
                            className={`w-full form-input ${validationErrors['slug'] ? 'border-red-400' : 'border-stone-300'}`}
                            type="text"
                            placeholder='xxx'
                            maxLength={100}
                            {...register("slug")}
                        />
                        {validationErrors.slug && <div className="form-error-label"> {validationErrors.slug} </div>}
                    </div>

                    <div className="mb-5 uppercase">
                        <label className="block mb-1 text-xs ps-1" htmlFor="name">{t('tags')}</label>
                        <div className={`flex justify-start flex-wrap gap-5 border p-4 ${validationErrors.tags ? 'border-red-400' : 'border-stone-300'}`}>
                            {
                                tags.map((tag, _index) => {
                                    return <div
                                        className="flex gap-1 justify-start items-center"
                                        key={tag.id}>
                                        <input
                                            type="checkbox"
                                            value={tag.name}
                                            className="h-[1.2rem] w-[1.2rem] border-[0.125rem] border-solid border-stone-300 "
                                            {...register("tags")}
                                        />
                                        <label className="hover:cursor-pointer text-xs uppercase">
                                            {tag.name}
                                        </label>
                                    </div>
                                })
                            }
                        </div>
                        {validationErrors.tags && <div className="form-error-label"> {validationErrors.tags} </div>}
                    </div>

                    <Tabs.Root
                        defaultValue="Indonesia">

                        <Tabs.List>
                            <Tabs.Trigger
                                value='Indonesia'
                                className='py-2 px-4 border border-b-0 border-stone-300 bg-stone-100 data-[state=active]:bg-lime-300 data-[state=active]:font-bold'>
                                <span className='uppercase text-xs'>Indonesia</span>
                            </Tabs.Trigger>
                            <Tabs.Trigger
                                value='English'
                                className='py-2 px-4 border  border-b-0 border-stone-300 bg-stone-100 data-[state=active]:bg-lime-300 data-[state=active]:font-bold'>
                                <span className='uppercase text-xs'>English</span>
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content
                            value='Indonesia'
                            className='py-4 px-4 border border-stone-300'>

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t('title')} - ID</label>
                                <textarea
                                    className={`w-full form-input ${validationErrors['title.id'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={2}
                                    {...register("title.id")}
                                />
                                {validationErrors['title.id'] && <div className="form-error-label"> {validationErrors['title.id']} </div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t('description')} - ID</label>
                                <textarea
                                    className={`w-full form-input ${validationErrors['description.id'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={4}
                                    {...register("description.id")}
                                />
                                {validationErrors['description.id'] && <div className="form-error-label"> {validationErrors['description.id']} </div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t('content')} - ID</label>
                                <textarea
                                    className={`w-full form-input ${validationErrors['content.id'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    rows={20}
                                    {...register("content.id")}
                                />
                                {validationErrors['content.id'] && <div className="form-error-label"> {validationErrors['content.id']} </div>}
                            </div>

                        </Tabs.Content>
                        <Tabs.Content
                            value='English'
                            className='py-4 px-4 border border-stone-300'>

                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t('title')} - EN</label>
                                <textarea
                                    className={`w-full form-input ${validationErrors['title.en'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={2}
                                    {...register("title.en")}
                                />
                                {validationErrors['title.en'] && <div className="form-error-label"> {validationErrors['title.en']} </div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t('description')} - EN</label>
                                <textarea
                                    className={`w-full form-input ${validationErrors['description.en'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={4}
                                    {...register("description.en")}
                                />
                                {validationErrors['description.en'] && <div className="form-error-label"> {validationErrors['description.en']} </div>}
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="name">{t('content')} - EN</label>
                                <textarea
                                    className={`w-full form-input ${validationErrors['content.en'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    rows={20}
                                    {...register("content.en")}
                                />
                                {validationErrors['content.en'] && <div className="form-error-label"> {validationErrors['content.en']} </div>}
                            </div>

                        </Tabs.Content>
                    </Tabs.Root>

                    <div className="mt-5 max-w-[400px] text-center flex gap-1">
                        <button
                            onClick={() => router.push(post ? `/data/post/${post.id}` : '/data/post')}
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
    )
}