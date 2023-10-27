import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { getAuthorities } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';


type Props = {
    authorities: Authority[]
}

export default function AuthorityListPage({ authorities }: Props) {

    const { t } = useTranslation('common');

    const router = useRouter();

    const [filtered, setFiltered] = useState(authorities);

    const filter = (keyword? : string) => {
        if(keyword){
            setFiltered(authorities.filter(el => el.code.toLowerCase().includes(keyword.toLowerCase()) ||
            el.description.toLowerCase().includes(keyword.toLowerCase())))
        }else{
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
                <div className='w-full flex justify-between items-center mb-3'>
                    <FilterForm filter={filter} />
                    <button
                        className='btn btn-default'
                        onClick={() => router.push('/data/authority/add')}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </button>
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('code')}</th>
                            <th>{t('description')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!filtered || filtered.length === 0) ?
                                <tr>
                                    <td colSpan={3}>Empty Data</td>
                                </tr> :
                                (filtered && filtered.map((authority, index) => {
                                    return <tr key={authority.id} onClick={() => router.push(`/data/authority/${authority.id}`)}>
                                        <td data-label="#">{index + 1}</td>
                                        <td data-label={t('code')}>{authority.code}</td>
                                        <td data-label={t('description')}>{authority.description}</td>
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
    const { data: authorities } = await getAuthorities(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            authorities
        }
    }
})