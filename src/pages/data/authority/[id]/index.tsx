import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import { COOKIE_TOKEN } from '@/configs/constant';
import BackIcon from '@/icons/BackIcon';
import BreadcrumbIcon from '@/icons/BredcrumbIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import HomeIcon from '@/icons/HomeIcon';
import { formatToTimestamp } from '@/libs/date-util';
import { deleteAuthority, getAuthority } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { AuthorityProps } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from "next/router";
import { useState } from 'react';



export default function AuthorityDetailPage({ authority, clientInfo }: AuthorityProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [showConfirm, setShowConfirm] = useState(false);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (authority) {
            await deleteAuthority(authority.id, clientInfo);
        }

        router.push('/data/authority');
    }


    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-start  items-center h-[40px] px-2 flex-wrap">
                    <Link href="/" className="h-full flex items-center px-2">
                        <HomeIcon className='w-5 h-5' />
                    </Link>
                    <div className='h-full flex items-center px-2'>
                        <BreadcrumbIcon className='w-3 h-3' />
                    </div>
                    <div className='h-full flex items-center px-2 uppercase'>
                        <span className='leading-none'>Authority</span>
                    </div>
                </div>
            </div>
            {authority && <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='detail'>
                    <div className='detail-item'>
                        <span>ID</span>
                        <span>{authority.id}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('code')}</span>
                        <span>{authority.code}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('description')}</span>
                        <span>{authority.description}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('createdBy')}</span>
                        <span>{authority.createdBy}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('createdAt')}</span>
                        <span>{formatToTimestamp(authority.createdAt)}</span>
                    </div>
                    {authority.updatedBy && <div className='detail-item'>
                        <span>{t('updatedBy')}</span>
                        <span>{authority.updatedBy}</span>
                    </div>}
                    {authority.updatedAt && <div className='detail-item'>
                        <span>{t('updatedAt')}</span>
                        <span>{formatToTimestamp(authority.updatedAt)}</span>
                    </div>}
                    <div className="mt-5 flex gap-2">
                        <button
                            onClick={() => router.push('/data/authority')}
                            type='button'
                            className="btn">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        <button
                            onClick={() => router.push(`/data/authority/${authority.id}/modify`)}
                            type='button'
                            className="btn">
                            <EditIcon className='w-[22px] h-[22px]' />
                            <span>{t('modify')}</span>
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

export const getServerSideProps = withAuth(async ({ req, params, locale }: GetServerSidePropsContext) => {
    const id = params?.id as string;
    const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const token = req.cookies[COOKIE_TOKEN];
    const { data } = await getAuthority(id, { locale: locale || 'id', clientIp: clientIp as string, userAgent, token: token as string });

    return {
        props: {
            namespaces: ['common'],
            authority: data
        }
    }
})