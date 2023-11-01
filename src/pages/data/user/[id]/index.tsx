import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import BackIcon from '@/icons/BackIcon';
import CheckIcon from '@/icons/CheckIcon';
import CloseIcon from '@/icons/CloseIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { formatToTimestamp } from '@/libs/date-util';
import { deleteUser, getUser } from '@/services/user-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { User } from '@/types/user-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';

type Props = {
    user: User,
    clientInfo: ClientInfo
}

export default function UserDetailPage({ user, clientInfo }: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [showConfirm, setShowConfirm] = useState(false);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (user) {
            await deleteUser(user.id, clientInfo);
        }

        router.push('/data/user');
    }

    const getIcon = (val: boolean) => {
        if(val){
            return <CheckIcon className='w-[18px] h-[18px] text-green-600' />
        }else{
            return <CloseIcon className='w-[24px] h-[24px] text-red-600' />
        }
    }


    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('user'), url: `/data/user` },
                        { label: t('detail') }
                    ]} />
            </div>
            {user && <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
                <div className='detail'>
                    <div className='detail-item'>
                        <div>ID</div>
                        <div>{user.id}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('username')}</div>
                        <div>{user.username}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('email')}</div>
                        <div>{user.email}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('loginAttempt')}</div>
                        <div>{user.loginAttempt}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('activated')}</div>
                        <div>{getIcon(user.activated)}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('locked')}</div>
                        <div>{getIcon(user.locked)}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('authorities')}</div>
                        <div>
                            <ol className="list-decimal ms-4">
                                {user.authorities.map(authority => <li key={authority}>{authority}</li>)}
                            </ol>
                        </div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('createdBy')}</div>
                        <div>{user.createdBy}</div>
                    </div>
                    <div className='detail-item'>
                        <div>{t('createdAt')}</div>
                        <div>{formatToTimestamp(user.createdAt)}</div>
                    </div>
                    {user.updatedBy && <div className='detail-item'>
                        <div>{t('updatedBy')}</div>
                        <div>{user.updatedBy}</div>
                    </div>}
                    {user.updatedAt && <div className='detail-item'>
                        <div>{t('updatedAt')}</div>
                        <div>{formatToTimestamp(user.updatedAt)}</div>
                    </div>}
                    <div className="mt-5 flex gap-2">
                        <button
                            onClick={() => router.push('/data/user')}
                            type='button'
                            className="btn btn-link">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        <button
                            onClick={() => router.push(`/data/user/${user.id}/update`)}
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
    const { data } = await getUser(id, clientInfo);

    return {
        props: {
            namespaces: ['common'],
            user: data
        }
    }
})