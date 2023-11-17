import { handleError } from '@/libs/axios-util';
import { translate } from '@/libs/validation-util';
import { useAppContext } from '@/providers/app-context';
import { createPost, updatePost } from '@/services/post-service';
import { PostFormProps } from '@/types/post-type';
import { MessageError } from '@/types/response-type';
import { ErrorValidation } from '@/types/validation-type';
import { CreatePostSchema, UpdatePostSchema } from '@/validations/post-schema';
import * as Tabs from '@radix-ui/react-tabs';
import { AxiosResponse } from 'axios';
import { flatten, unflatten } from 'flat';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import BreadCrumb from '../BreadCrumb';
import MessageErrorBox from '../MessageErrorBox';
import ValidationError from '../ValidationError';

type FlatPost = {
    [key: string]: string
}

export default function PostForm({ post, tags, clientInfo }: PostFormProps) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const { register, handleSubmit } = useForm<FlatPost>({ defaultValues: flatten(post, { safe: true }) });

    const [validationErrors, setValidationErrors] = useState<ErrorValidation>({});

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const onSubmit: SubmitHandler<FlatPost> = async (data) => {
        try {
            setValidationErrors({});
            setMessageError(null);

            const validation = (post?.id) ? UpdatePostSchema.safeParse(unflatten(data)) : CreatePostSchema.safeParse(unflatten(data));
            
            if (validation.success) {
                setLoading(true);
                const response = (post?.id) ? (await updatePost(post.id, validation.data, clientInfo)) : (await createPost(validation.data, clientInfo));
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
            router.push('/data/post');
        } else if (response.status === 200) {
            router.push(`/data/post/${post.id}`);
        } else if (response.status === 400) {
            setValidationErrors(translate(response.data, t));
        } else if (response.status === 409) {
            setMessageError(response.data);
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                {post ?
                    <BreadCrumb
                        items={[
                            { label: t('post'), url: `/data/post/${post.id}` },
                            { label: t('update') }
                        ]} /> :
                    <BreadCrumb
                        items={[
                            { label: t('post'), url: `/data/post` },
                            { label: t('add') }
                        ]} />
                }
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <MessageErrorBox messageError={messageError} />
                <form
                    className='w-full'
                    onSubmit={handleSubmit(onSubmit)}
                    method='post'
                    noValidate
                    autoComplete='off' >

                    <div className="form-group">
                        <label className='form-label' htmlFor="slug">{t('slug')}</label>
                        <input
                            id='slug'
                            autoComplete='false'
                            className={`w-full form-input ${validationErrors['slug'] ? 'border-red-400' : 'border-stone-300'}`}
                            type="text"
                            placeholder='xxx'
                            maxLength={100}
                            {...register("slug")}
                        />
                        <ValidationError message={validationErrors.slug} />
                    </div>

                    <div className="mb-5">
                        <label className="block mb-1 text-xs ps-1">{t('tags')}</label>
                        <div className={`flex justify-start flex-wrap gap-5 border p-4 ${validationErrors.tags ? 'border-red-400' : 'border-stone-300'}`}>
                            {
                                tags.map((tag, _index) => {
                                    return <div
                                        className="flex gap-1 justify-start items-center min-w-[140px]"
                                        key={tag.id}>
                                        <input
                                            id={tag.name}
                                            type="checkbox"
                                            value={tag.name}
                                            className="h-[1.2rem] w-[1.2rem] border-[0.125rem] border-solid border-stone-300 "
                                            {...register("tags")}
                                        />
                                        <label className="hover:cursor-pointer text-xs uppercase" htmlFor={tag.name}>
                                            {tag.name}
                                        </label>
                                    </div>
                                })
                            }
                        </div>
                        <ValidationError message={validationErrors.tags} />
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
                                <label className="form-label" htmlFor="title.id">{t('title')} - ID</label>
                                <textarea
                                    id='title.id'
                                    autoComplete='false'
                                    className={`w-full form-input ${validationErrors['title.id'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={2}
                                    {...register("title.id")}
                                />
                                <ValidationError message={validationErrors['title.id']} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="description.id">{t('description')} - ID</label>
                                <textarea
                                    id='description.id'
                                    autoComplete='false'
                                    className={`w-full form-input ${validationErrors['description.id'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={4}
                                    {...register("description.id")}
                                />
                                <ValidationError message={validationErrors['description.id']} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="content.id">{t('content')} - ID</label>
                                <textarea
                                    id='content.id'
                                    autoComplete='false'
                                    className={`w-full form-input ${validationErrors['content.id'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    rows={20}
                                    {...register("content.id")}
                                />
                                <ValidationError message={validationErrors['content.id']} />
                            </div>

                        </Tabs.Content>
                        <Tabs.Content
                            value='English'
                            className='py-4 px-4 border border-stone-300'>

                            <div className="form-group">
                                <label className="form-label" htmlFor="title.en">{t('title')} - EN</label>
                                <textarea
                                    id='title.en'
                                    autoComplete='false'
                                    className={`w-full form-input ${validationErrors['title.en'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={2}
                                    {...register("title.en")}
                                />
                                <ValidationError message={validationErrors['title.en']} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="description.en">{t('description')} - EN</label>
                                <textarea
                                    id='description.en'
                                    autoComplete='false'
                                    className={`w-full form-input ${validationErrors['description.en'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    maxLength={150}
                                    rows={4}
                                    {...register("description.en")}
                                />
                                <ValidationError message={validationErrors['description.en']} />
                            </div>
                            <div className="form-group">
                                <label className="form-label" htmlFor="content.en">{t('content')} - EN</label>
                                <textarea
                                    id='content.en'
                                    autoComplete='false'
                                    className={`w-full form-input ${validationErrors['content.en'] ? 'border-red-400' : 'border-stone-300'}`}
                                    placeholder='xxx'
                                    rows={20}
                                    {...register("content.en")}
                                />
                                <ValidationError message={validationErrors['content.en']} />
                            </div>

                        </Tabs.Content>
                    </Tabs.Root>

                    <div className="mt-5 max-w-[400px] text-center flex gap-1">
                        <button
                            onClick={() => router.push(post ? `/data/post/${post.id}` : '/data/post')}
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
    )
}