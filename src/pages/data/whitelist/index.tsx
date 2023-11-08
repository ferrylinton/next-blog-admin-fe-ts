import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import MessageErrorBox from '@/components/MessageErrorBox';
import { MODIFY_WHITELIST_DATA, READ_WHITELIST_DATA } from '@/configs/auth-constant';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getWhitelists } from '@/services/whitelist-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { Whitelist } from '@/types/whitelist-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';


type Props = {
    whitelists: Whitelist[],
    messageError: MessageError | null,
    clientInfo: ClientInfo
}

export default function WhitelistListPage({ whitelists, messageError, clientInfo }: Props) {

    const { t } = useTranslation('common');

    const [filtered, setFiltered] = useState(whitelists);

    const filter = (keyword?: string) => {
        if (keyword) {
            setFiltered(whitelists.filter(el => el.ip.toLowerCase().includes(keyword.toLowerCase()) ||
                el.description.toLowerCase().includes(keyword.toLowerCase())))
        } else {
            setFiltered(whitelists);
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('whitelist') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-10'>
                <MessageErrorBox messageError={messageError} />
                <div className='w-full flex justify-between items-center mb-3'>
                    <FilterForm filter={filter} />
                    {isAuthorize(clientInfo, [MODIFY_WHITELIST_DATA]) && <Link
                        className='btn btn-link'
                        href={'/data/whitelist/add'}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </Link>}
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('ip')}</th>
                            <th>{t('description')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!filtered || filtered.length === 0) ?
                                <tr>
                                    <td colSpan={4} className='empty'>
                                        <span>{t('dataIsEmpty')}</span>
                                    </td>
                                </tr> :
                                (filtered && filtered.map((whitelist, index) => {
                                    return <tr key={whitelist.id}>
                                        <td data-label="#">{index + 1}</td>
                                        <td data-label={t('ip')}>{whitelist.ip}</td>
                                        <td data-label={t('description')}>{whitelist.description}</td>
                                        <td><Link href={`/data/whitelist/${whitelist.id}`}>{t('detail')}</Link></td>
                                    </tr>
                                }))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}


export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const { data: whitelists } = await getWhitelists(clientInfo);

    return {
        props: {
            whitelists,
            authorized: isAuthorize(clientInfo, [READ_WHITELIST_DATA])
        }
    }
})