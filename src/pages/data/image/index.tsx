import BreadCrumb from '@/components/BreadCrumb';
import FilterForm from '@/components/FilterForm';
import ImageWithDimension from '@/components/ImageWithDimension';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { getImages } from '@/services/image-service';
import { withAuth } from '@/services/wrapper-service';
import { Image as ImageType } from '@/types/image-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useState } from 'react';


type Props = {
    images: ImageType[]
}

export default function ImageListPage({ images }: Props) {

    const { t } = useTranslation('common');

    const router = useRouter();

    const [filtered, setFiltered] = useState(images);

    const filter = (keyword?: string) => {
        if (keyword) {
            setFiltered(images.filter(el => el.filename.toLowerCase().includes(keyword.toLowerCase())))
        } else {
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
                <div className='w-full flex  flex-wrap justify-start items-start gap-2'>
                    {
                        (!filtered || filtered.length === 0) ?
                            <div>Empty Data</div> :
                            (filtered && filtered.map((image) => {
                                return (<div key={image.id} className='flex flex-col justify-start items-center w-full sm:w-[calc(50%-5px)] h-[200px] border border-stone-300 p-2 hover:outline outline-2 outline-lime-300 overflow-hidden relative'>
                                    <ImageWithDimension image={image} />
                                    <div className='bg-stone-500 bg-opacity-50 p-2 absolute bottom-1 inset-x-1 text-center'>
                                        <span className='drop-shadow-[0_1px_1px_rgba(0,0,0,1)] text-white'>{image.filename}</span>
                                    </div>
                                </div>)
                            }))
                    }
                </div>
            </div>
        </div>
    )
}


export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const { data } = await getImages(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            images: data
        }
    }
})