import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import MessageErrorBox from '@/components/MessageErrorBox';
import NotFound from '@/components/NotFound';
import DetailValue from '@/components/DetailValue';
import { BLOG_ADMIN, BLOG_OWNER } from '@/configs/auth-constant';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { handleError } from '@/libs/axios-util';
import { useAppContext } from '@/providers/app-context';
import { deleteTag, getTag } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { Tag } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';

type Props = {
    tag: Tag,
    clientInfo: ClientInfo
}

export default function TagDetailPage({ tag, clientInfo }: Props) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const [showConfirm, setShowConfirm] = useState(false);

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (tag) {
            try {
                setLoading(true);
                await deleteTag(tag.id, clientInfo);
                setTimeout(() => router.push('/data/tag'), 500);
            } catch (error: any) {
                handleError(setMessageError, i18n.language, error);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        }
    }


    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>

            <BreadCrumb
                items={[
                    { label: t('tag'), url: `/data/tag` },
                    { label: t('detail') }
                ]} />
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <MessageErrorBox messageError={messageError} />
                {!tag && <NotFound id={router.query.id} />}
                {tag && <>
                    <table className='table-detail'>
                        <tbody>
                            {
                                Object.keys(tag).map(key => {
                                    return <tr key={key}>
                                        <th>{t(key)}</th>
                                        <td><DetailValue val={tag[key as keyof typeof tag]} /></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div className="w-ful flex justify-start items-start gap-2">
                        <button
                            onClick={() => router.push('/data/tag')}
                            type='button'
                            className="btn btn-link">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        {(isAuthorize(clientInfo, [BLOG_ADMIN]) || clientInfo.authData?.username === tag.createdBy) && <>
                            <button
                                onClick={() => router.push(`/data/tag/${tag.id}/update`)}
                                type='button'
                                className="btn btn-link">
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
                            <DeleteConfirmDialog
                                showConfirm={showConfirm}
                                setShowConfirm={setShowConfirm}
                                okHandler={okHandler} />
                        </>}
                    </div>
                </>}
            </div>
        </div>
    )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context)
    const id = context.params?.id as string;
    const { data } = await getTag(id, clientInfo);

    return {
        props: {
            tag: data,
            authorized: isAuthorize(clientInfo, [BLOG_ADMIN, BLOG_OWNER])
        }
    }
})