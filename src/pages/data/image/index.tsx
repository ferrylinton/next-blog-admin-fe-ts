import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { getImages } from '@/services/image-service';
import { withAuth } from '@/services/wrapper-service';
import { Image } from '@/types/image-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';


type Props = {
    images: Image[]
}

export default function ImageListPage({ images }: Props) {

    const { t } = useTranslation('common');

    const router = useRouter();

    const [filtered, setFiltered] = useState(images);

    const filter = (keyword? : string) => {
        if(keyword){
            setFiltered(images.filter(el => el.filename.toLowerCase().includes(keyword.toLowerCase())))
        }else{
            setFiltered(images);
        }
        
    }

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('image') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-10'>
                <div className='w-full flex justify-between items-center mb-3'>
                    <FilterForm filter={filter} />
                    <button
                        className='btn btn-default'
                        onClick={() => router.push('/data/image/add')}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </button>
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('filename')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!filtered || filtered.length === 0) ?
                                <tr>
                                    <td colSpan={2}>Empty Data</td>
                                </tr> :
                                (filtered && filtered.map((image, index) => {
                                    return <tr key={image.id} onClick={() => router.push(`/data/image/${image.id}`)}>
                                        <td data-label="#">{index + 1}</td>
                                        <td data-label={t('filename')}>{image.filename}</td>
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
    const { data: images } = await getImages(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            images
        }
    }
})