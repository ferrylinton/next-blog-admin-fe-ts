import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import DetailValue from '@/components/detail-value';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import EditIcon from '@/icons/EditIcon';
import { getClientInfo } from '@/libs/auth-util';
import { deleteWhitelist, getWhitelist } from '@/services/whitelist-service';
import { withAuth } from '@/services/wrapper-service';
import { WhitelistPageProps } from '@/types/whitelist-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import { useState } from 'react';



export default function WhitelistDetailPage({ whitelist, clientInfo }: WhitelistPageProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [showConfirm, setShowConfirm] = useState(false);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (whitelist) {
            await deleteWhitelist(whitelist.id, clientInfo);
        }

        router.push('/data/whitelist');
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
            {whitelist && <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>
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
                <div className="mt-5 flex gap-2">
                    <button
                        onClick={() => router.push('/data/whitelist')}
                        type='button'
                        className="btn btn-link">
                        <BackIcon className='w-[20px] h-[20px]' />
                        <span>{t('back')}</span>
                    </button>
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
    const { data } = await getWhitelist(id, clientInfo);

    return {
        props: {
            namespaces: ['common'],
            whitelist: data
        }
    }
})