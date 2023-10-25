import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import { COOKIE_TOKEN } from '@/configs/constant';
import AddIcon from '@/icons/AddIcon';
import BreadcrumbIcon from '@/icons/BredcrumbIcon';
import HomeIcon from '@/icons/HomeIcon';
import { getAuthorities } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


type Props = {
    authorities: Authority[]
}

export default function AuthorityListPage({ authorities }: Props) {

    const router = useRouter();

    const [filtered, setFiltered] = useState(authorities);

    const { t } = useTranslation('common');

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
                    <FilterForm authorities={authorities} setFiltered={setFiltered} />
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


export const getServerSideProps = withAuth(async ({ req, res, locale }: GetServerSidePropsContext) => {
    const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const token = req.cookies[COOKIE_TOKEN];

    const { data: authorities } = await getAuthorities({ locale: locale ?? 'id', clientIp: clientIp as string, userAgent, token: token as string });
    return {
        props: {
            namespaces: ['common', 'authority'],
            authorities
        }
    }
})