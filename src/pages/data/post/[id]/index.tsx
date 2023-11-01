import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { formatToTimestamp } from '@/libs/date-util';
import { deletePost, getPost } from '@/services/post-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { Post } from '@/types/post-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';

type Props = {
    post: Post,
    clientInfo: ClientInfo
}

export default function PostDetailPage({ post, clientInfo }: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [showConfirm, setShowConfirm] = useState(false);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (post) {
            await deletePost(post.id, clientInfo);
        }

        router.push('/data/post');
    }


    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('post'), url: `/data/post` },
                        { label: t('detail') }
                    ]} />
            </div>
            {post && <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='detail'>
                    <div className='detail-item'>
                        <span>ID</span>
                        <span>{post.id}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('slug')}</span>
                        <span>{post.slug}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('createdBy')}</span>
                        <span>{post.createdBy}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('createdAt')}</span>
                        <span>{formatToTimestamp(post.createdAt)}</span>
                    </div>
                    {post.updatedBy && <div className='detail-item'>
                        <span>{t('updatedBy')}</span>
                        <span>{post.updatedBy}</span>
                    </div>}
                    {post.updatedAt && <div className='detail-item'>
                        <span>{t('updatedAt')}</span>
                        <span>{formatToTimestamp(post.updatedAt)}</span>
                    </div>}
                    <Tabs.Root
                        className='w-full'
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

                            <div className='w-full flex flex-col mb-3 gap-1'>
                                <div className='font-bold'>{t('title')} :</div>
                                <div>{post.title.id}</div>
                            </div>

                            <div className='w-full flex flex-col mb-3 gap-1'>
                                <div className='font-bold'>{t('description')} :</div>
                                <div>{post.description.id}</div>
                            </div>

                            <div className='w-full flex flex-col mb-3 gap-1'>
                                <div className='font-bold'>{t('content')} :</div>
                                <textarea
                                    className='border border-stone-300 text-sm'
                                    readOnly
                                    rows={20}
                                    value={post.content.id}></textarea>
                            </div>

                        </Tabs.Content>
                        <Tabs.Content
                            value='English'
                            className='py-4 px-4 border border-stone-300'>

                            <div className='w-full flex flex-col mb-3 gap-1'>
                                <div className='font-bold'>{t('title')} :</div>
                                <div>{post.title.en}</div>
                            </div>

                            <div className='w-full flex flex-col mb-3 gap-1'>
                                <div className='font-bold'>{t('description')} :</div>
                                <div>{post.description.en}</div>
                            </div>

                            <div className='w-full flex flex-col mb-3 gap-1'>
                                <div className='font-bold'>{t('content')} :</div>
                                <textarea
                                    className='border border-stone-300 text-sm'
                                    readOnly
                                    rows={20}
                                    value={post.content.en}></textarea>
                            </div>

                        </Tabs.Content>
                    </Tabs.Root>

                    <div className="mt-5 flex gap-2">
                        <button
                            onClick={() => router.push('/data/post')}
                            type='button'
                            className="btn">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        <button
                            onClick={() => router.push(`/data/post/${post.id}/update`)}
                            type='button'
                            className="btn">
                            <EditIcon className='w-[22px] h-[22px]' />
                            <span>{t('update')}</span>
                        </button>
                        <button
                            onClick={() => showDeleteConfirmation()}
                            type='button'
                            className="btn btn-danger">
                            <DeleteIcon className='w-[20px] h-[20px]' />
                            <span>{t('delete')}</span>
                        </button>
                    </div>

                </div>
            </div>}

            <DeleteConfirmDialog
                showConfirm={showConfirm}
                setShowConfirm={setShowConfirm}
                okHandler={okHandler} />

        </div>
    )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data } = await getPost(id, clientInfo);

    return {
        props: {
            namespaces: ['common'],
            post: data
        }
    }
})