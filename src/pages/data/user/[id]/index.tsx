import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import MessageErrorBox from '@/components/MessageErrorBox';
import NotFound from '@/components/NotFound';
import DetailValue from '@/components/detail-value';
import { MODIFY_USER_DATA, READ_USER_DATA } from '@/configs/auth-constant';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import PasswordIcon from '@/icons/PasswordIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { errorHandler } from '@/libs/axios-util';
import { useAppContext } from '@/providers/app-context';
import { deleteUser, getUser } from '@/services/user-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
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

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const [showConfirm, setShowConfirm] = useState(false);

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (user) {
            try {
                setLoading(true);
                await deleteUser(user.id, clientInfo);
                setTimeout(() => router.push('/data/user'), 500);
            } catch (error: any) {
                errorHandler(setMessageError, i18n.language, error);
            } finally {
                setTimeout(() => setLoading(false), 500);
            }
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('user'), url: `/data/user` },
                        { label: router.query.id as string }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <MessageErrorBox messageError={messageError} />
                {!user && <NotFound id={router.query.id} />}
                {user && <>
                    <table className='table-detail'>
                        <tbody>
                            {
                                Object.keys(user).map(key => {
                                    if (key === 'password')
                                        return null;
                                    else
                                        return <tr key={key}>
                                            <th>{t(key)}</th>
                                            <td><DetailValue val={user[key as keyof typeof user]} /></td>
                                        </tr>
                                })
                            }
                        </tbody>
                    </table>

                    <div className="w-ful flex justify-start items-start gap-2">
                        <button
                            onClick={() => router.push('/data/user')}
                            type='button'
                            className="btn btn-link">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        {(isAuthorize(clientInfo, [MODIFY_USER_DATA]) || clientInfo.authData?.username === user.createdBy) && <>
                            <button
                                onClick={() => router.push(`/data/user/${user.id}/update`)}
                                type='button'
                                className="btn btn-link">
                                <EditIcon className='w-[22px] h-[22px]' />
                                <span>{t('update')}</span>
                            </button>
                            <button
                                onClick={() => router.push(`/data/user/${user.id}/changepassword`)}
                                type='button'
                                className="btn btn-link">
                                <PasswordIcon className='w-[22px] h-[22px]' />
                                <span>{t('changePassword')}</span>
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
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data } = await getUser(id, clientInfo);

    return {
        props: {
            user: data,
            authorized: isAuthorize(clientInfo, [READ_USER_DATA, MODIFY_USER_DATA])
        }
    }
})