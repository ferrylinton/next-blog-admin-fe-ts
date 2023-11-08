import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import MessageErrorBox from '@/components/MessageErrorBox';
import { MODIFY_USER_DATA, READ_USER_DATA } from '@/configs/auth-constant';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getAuthorities } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { ClientInfo } from '@/types/common-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useState } from 'react';


type Props = {
    authorities?: Authority[],
    messageError: MessageError | null,
    clientInfo: ClientInfo
}

export default function AuthorityListPage({ authorities, messageError, clientInfo }: Props) {

    const { t } = useTranslation('common');

    const [filtered, setFiltered] = useState(authorities);

    const filter = (keyword?: string) => {
        if (authorities && keyword) {
            setFiltered(authorities.filter(el => el.code.toLowerCase().includes(keyword.toLowerCase()) ||
                el.description.toLowerCase().includes(keyword.toLowerCase())))
        } else {
            setFiltered(authorities);
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('authority') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-10'>
                <MessageErrorBox messageError={messageError} />
                <div className='w-full flex justify-between items-center mb-3'>
                    <FilterForm filter={filter} />
                    {isAuthorize(clientInfo, [MODIFY_USER_DATA]) && <Link
                        className='btn btn-link'
                        href={'/data/authority/add'}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </Link>}
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('code')}</th>
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
                                (filtered && filtered.map((authority, index) => {
                                    return <tr key={authority.id}>
                                        <td data-label="#">{index + 1}</td>
                                        <td data-label={t('code')}>{authority.code}</td>
                                        <td data-label={t('description')}>{authority.description}</td>
                                        <td>
                                            <Link href={`/data/authority/${authority.id}`}>{t('detail')}</Link>
                                        </td>
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
    const { data } = await getAuthorities(clientInfo);

    return {
        props: {
            authorities: data,
            authorized: isAuthorize(clientInfo, [READ_USER_DATA])
        }
    }
})