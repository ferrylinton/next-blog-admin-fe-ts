import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { getTags } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { Tag } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


type Props = {
    tags: Tag[]
}

export default function TagListPage({ tags }: Props) {

    const { t } = useTranslation('common');

    const router = useRouter();

    const [filtered, setFiltered] = useState(tags);

    const filter = (keyword?: string) => {
        if (keyword) {
            setFiltered(tags.filter(tag => tag.name.toLowerCase().includes(keyword.toLowerCase())))
        } else {
            setFiltered(tags);
        }
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('tag') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-10'>
                <div className='w-full flex justify-between items-center mb-3'>
                    <FilterForm filter={filter} />
                    <button
                        className='btn btn-link'
                        onClick={() => router.push('/data/tag/add')}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </button>
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('name')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!filtered || filtered.length === 0) ?
                                <tr>
                                    <td colSpan={3} className='empty'>
                                        <span>{t('dataIsEmpty')}</span>
                                    </td>
                                </tr> :
                                (filtered && filtered.map((tag, index) => {
                                    return <tr key={tag.id} onClick={() => router.push(`/data/tag/${tag.id}`)}>
                                        <td data-label="#">{index + 1}</td>
                                        <td data-label={t('name')}>{tag.name}</td>
                                        <td>
                                            <Link href={`/data/tag/${tag.id}`}>{t('detail')}</Link>
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
    const { data } = await getTags(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            tags: data
        }
    }
})