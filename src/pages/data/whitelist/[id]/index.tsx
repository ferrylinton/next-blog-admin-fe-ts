import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import MessageErrorBox from '@/components/MessageErrorBox';
import NotFound from '@/components/NotFound';
import DetailValue from '@/components/detail-value';
import { MODIFY_USER_DATA } from '@/configs/auth-constant';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { errorHandler } from '@/libs/axios-util';
import { useAppContext } from '@/providers/app-context';
import { deleteWhitelist, getWhitelist } from '@/services/whitelist-service';
import { withAuth } from '@/services/wrapper-service';
import { MessageError } from '@/types/response-type';
import { WhitelistPageProps } from '@/types/whitelist-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';



export default function WhitelistDetailPage({ whitelist, clientInfo }: WhitelistPageProps) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const [showConfirm, setShowConfirm] = useState(false);

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (whitelist) {
            try {
                setLoading(true);
                await deleteWhitelist(whitelist.id, clientInfo);
                setTimeout(() => router.push('/data/whitelist'), 500);
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
                        { label: t('whitelist'), url: `/data/whitelist` },
                        { label: t('detail') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <MessageErrorBox messageError={messageError} />
                {!whitelist && <NotFound id={router.query.id} />}
                {whitelist && <>
                    <table className='table-detail'>
                        <tbody>
                            {
                                Object.keys(whitelist).map(key => {
                                    return <tr key={key}>
                                        <th>{t(key)}</th>
                                        <td><DetailValue val={whitelist[key as keyof typeof whitelist]} /></td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </table>
                    <div className="w-ful flex justify-start items-start gap-2">
                        <button
                            onClick={() => router.push('/data/whitelist')}
                            type='button'
                            className="btn btn-link">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        {(isAuthorize(clientInfo, [MODIFY_USER_DATA]) || clientInfo.authData?.username === whitelist.createdBy) && <>
                            <button
                                onClick={() => router.push(`/data/whitelist/${whitelist.id}/update`)}
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
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: whitelist } = await getWhitelist(id, clientInfo);

    return {
        props: {
            whitelist,
            authorized: isAuthorize(clientInfo, [MODIFY_USER_DATA])
        }
    }
})