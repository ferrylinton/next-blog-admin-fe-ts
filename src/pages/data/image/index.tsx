import BreadCrumb from '@/components/BreadCrumb';
import ImageWithDimension from '@/components/ImageWithDimension';
import MessageErrorBox from '@/components/MessageErrorBox';
import SearchForm from '@/components/SearchForm';
import { IMAGE_ADMIN, IMAGE_OWNER } from '@/configs/auth-constant';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { isValidPage } from '@/libs/paging-util';
import { getImages } from '@/services/image-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo, Pageable } from '@/types/common-type';
import { Image } from '@/types/image-type';
import { RequestParams } from '@/types/request-params-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';


type Props = {
    pageable: Pageable<Image>,
    messageError: MessageError | null,
    clientInfo: ClientInfo
}

export default function ImageListPage({ pageable, messageError, clientInfo }: Props) {

    const { i18n, t } = useTranslation('common');

    const router = useRouter();

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('image') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-10'>
                <MessageErrorBox messageError={messageError} />
                <div className='w-full flex justify-between items-center mb-3'>
                    <SearchForm url='/data/image' />
                    {isAuthorize(clientInfo, [IMAGE_OWNER]) && <Link
                        className='btn btn-link'
                        href={'/data/image/add'}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </Link>}
                </div>
                <div className='w-full flex  flex-wrap justify-start items-start gap-2'>
                    {
                        (!pageable.data || pageable.data.length === 0) ?
                            <div>{t('dataIsEmpty')}</div> :
                            (pageable.data && pageable.data.map((image) => {
                                return (<div key={image.id} className='group cursor-pointer flex flex-col justify-start items-center w-full sm:w-[calc(50%-5px)] h-[200px] border border-stone-300 p-2 hover:outline outline-2 outline-lime-300 overflow-hidden relative'
                                    onClick={() => router.push(`/data/image/${image.id}`)}>
                                    <ImageWithDimension image={image} />
                                    <div className='bg-lime-400 bg-opacity-80 p-2 absolute bottom-0 inset-x-0 text-center transition transform translate-y-8 ease-in-out invisible group-hover:visible group-hover:translate-y-0'>
                                        <div className='drop-shadow-[0_1px_1px_rgba(255,255,255,1)] text-stone-800 font-semibold text-sm'>{image.filename}</div>
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
    const { page, keyword, tag, destination } = getRequestParams(context);

    if (destination) {
        return {
            redirect: {
                destination: destination,
                permanent: false,
            },
        }
    }

    const { data: pageable } = await getImages(clientInfo, { page, keyword, tag });

    return {
        props: {
            pageable,
            authorized: isAuthorize(clientInfo, [IMAGE_ADMIN, IMAGE_OWNER])
        }
    }
})

function getRequestParams(context: GetServerSidePropsContext) {
    const locale = context.locale ?? 'id';
    const requestParams: RequestParams = { page: 1 };

    if (context.query?.keyword && context.query?.keyword.length > 2) {
        requestParams.keyword = context.query?.keyword as string
    }

    if (context.query.page && !isValidPage(context.query.page as string)) {
        requestParams.destination = (locale === 'id' ? '' : '/' + locale)
            + (context.resolvedUrl.split("?")[0] + '?page=1')
            + (context.query?.keyword ? '&keyword=' + context.query?.keyword : '');
    }

    requestParams.page = (context.query.page && isValidPage(context.query.page as string)) ? parseInt(context.query.page as string) : 1;
    return requestParams;
}