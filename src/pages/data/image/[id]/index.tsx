import BreadCrumb from '@/components/BreadCrumb';
import DeleteConfirmDialog from '@/components/DeleteConfirmDialog';
import MessageErrorBox from '@/components/MessageErrorBox';
import NotFound from '@/components/NotFound';
import { BASIC, IMAGE_ADMIN } from '@/configs/auth-constant';
import BackIcon from '@/icons/BackIcon';
import DeleteIcon from '@/icons/DeleteIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { handleError } from '@/libs/axios-util';
import { formatToTimestamp } from '@/libs/date-util';
import { useAppContext } from '@/providers/app-context';
import { deleteImage, getImage } from '@/services/image-service';
import { withAuth } from '@/services/wrapper-service';
import { ImageProps } from '@/types/image-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import { useRouter } from "next/router";
import { useState } from 'react';



export default function ImageDetailPage({ image, clientInfo }: ImageProps) {

    const router = useRouter();

    const { t, i18n } = useTranslation('common');

    const { setLoading } = useAppContext();

    const [showConfirm, setShowConfirm] = useState(false);

    const [messageError, setMessageError] = useState<MessageError | null>(null);

    const showDeleteConfirmation = () => {
        setShowConfirm(true);
    }

    const okHandler = async () => {
        if (image) {
            try {
                setLoading(true);
                await deleteImage(image.id, clientInfo);
                setTimeout(() => router.push('/data/image'), 500);
            } catch (error: any) {
                handleError(setMessageError, i18n.language, error);
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
                        { label: t('image'), url: `/data/image` },
                        { label: t('detail') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <MessageErrorBox messageError={messageError} />
                {!image && <NotFound id={router.query.id} />}
                {image && <>

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
                            <div>ID</div>
                            <div>{image.id}</div>
                        </div>
                        <div className='detail-item'>
                            <div>{t('filename')}</div>
                            <div>{image.filename}</div>
                        </div>
                        <div className='detail-item'>
                            <div>{t('width')}</div>
                            <div>{image.metadata.width}</div>
                        </div>
                        <div className='detail-item'>
                            <div>{t('height')}</div>
                            <div>{image.metadata.height}</div>
                        </div>
                        <div className='detail-item'>
                            <div>{t('size')}</div>
                            <div>{image.length} byte</div>
                        </div>
                        <div className='detail-item'>
                            <div>{t('createdBy')}</div>
                            <div>{image.metadata.createdBy}</div>
                        </div>
                        <div className='detail-item'>
                            <div>{t('createdAt')}</div>
                            <div>{formatToTimestamp(image.uploadDate)}</div>
                        </div>
                        <div className="mt-5 flex gap-2">
                            <button
                                onClick={() => router.push('/data/image')}
                                type='button'
                                className="btn btn-link">
                                <BackIcon className='w-[20px] h-[20px]' />
                                <span>{t('back')}</span>
                            </button>
                            {(isAuthorize(clientInfo, [IMAGE_ADMIN]) || clientInfo.authData?.username === image.metadata.createdBy) && <>
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
                    </div>
                </>}
            </div>


        </div>
    )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: image } = await getImage(id, clientInfo);

    return {
        props: {
            image,
            authorized: isAuthorize(clientInfo, [BASIC])
        }
    }
})