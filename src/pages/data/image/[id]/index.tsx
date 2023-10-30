import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import { getClientInfo } from '@/libs/client-info-util';
import { formatToTimestamp } from '@/libs/date-util';
import { deleteImage, getImage } from '@/services/image-service';
import { withAuth } from '@/services/wrapper-service';
import { ImageProps } from '@/types/image-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useState } from 'react';



export default function ImageDetailPage({ image, clientInfo }: ImageProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    const [showConfirm, setShowConfirm] = useState(false);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (image) {
            await deleteImage(image.id, clientInfo);
        }

        router.push('/data/image');
    }


    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('image'), url: `/data/image` },
                        { label: t('detail') }
                    ]} />
            </div>
            {image && <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-5'>

                <div className='w-full flex justify-center items-center p-2 mb-3 border border-stone-300'>
                    <Image src={process.env.NEXT_PUBLIC_API_HOST + image.urls[0]}
                        alt={process.env.NEXT_PUBLIC_API_HOST + image.urls[0]}
                        priority={true}
                        width={image.metadata.width}
                        height={image.metadata.height}
                        className='min-w-[50px] min-h-[50px] object-cover'
                    />
                </div>
                <div className='detail'>
                    <div className='detail-item'>
                        <span>ID</span>
                        <span>{image.id}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('filename')}</span>
                        <span>{image.filename}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('width')}</span>
                        <span>{image.metadata.width}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('height')}</span>
                        <span>{image.metadata.height}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('size')}</span>
                        <span>{image.length} byte</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('createdBy')}</span>
                        <span>{image.metadata.createdBy}</span>
                    </div>
                    <div className='detail-item'>
                        <span>{t('createdAt')}</span>
                        <span>{formatToTimestamp(image.uploadDate)}</span>
                    </div>
                    <div className="mt-5 flex gap-2">
                        <button
                            onClick={() => router.push('/data/image')}
                            type='button'
                            className="btn">
                            <BackIcon className='w-[20px] h-[20px]' />
                            <span>{t('back')}</span>
                        </button>
                        <button
                            onClick={() => showDeleteConfirmation()}
                            type='button'
                            className="btn btn-danger">
                            <DeleteIcon className='w-[20px] h-[20px]' />
                            <span>{t('delete')}</span>
                        </button>
                    </div>

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
    const { data } = await getImage(id, clientInfo);

    return {
        props: {
            namespaces: ['common'],
            image: data
        }
    }
})