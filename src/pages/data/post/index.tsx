import BreadCrumb from '@/components/BreadCrumb';
import MessageErrorBox from '@/components/MessageErrorBox';
import Paging from '@/components/Paging';
import SearchForm from '@/components/SearchForm';
import { BLOG_ADMIN, BLOG_OWNER } from '@/configs/auth-constant';
import AddIcon from '@/icons/AddIcon';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { isValidPage } from '@/libs/paging-util';
import { getPosts } from '@/services/post-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo, Pageable } from '@/types/common-type';
import { Post } from '@/types/post-type';
import { RequestParams } from '@/types/request-params-type';
import { MessageError } from '@/types/response-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';


type Props = {
    pageable?: Pageable<Post>,
    messageError: MessageError | null,
    clientInfo: ClientInfo
}

export default function PostListPage({ pageable, messageError, clientInfo }: Props) {

    const { i18n, t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px]'>
            <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('post') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center items-center px-2 py-10'>
                <MessageErrorBox messageError={messageError} />
                <div className='w-full flex justify-between items-center mb-3'>
                    <SearchForm url='/data/post' />
                    {isAuthorize(clientInfo, [BLOG_OWNER]) && <Link
                        className='btn btn-link'
                        href={'/data/post/add'}>
                        <AddIcon className='w-[20px] h-[20px]' />
                        <span>{t('add')}</span>
                    </Link>}
                </div>
                <table className='table-responsive w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{t('title')}</th>
                            <th className='min-w-[100px]'>{t('createdBy')}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (!pageable || !pageable.data || pageable.data.length === 0) ?
                                <tr>
                                    <td colSpan={4} className='empty'>
                                        <span>{t('dataIsEmpty')}</span>
                                    </td>
                                </tr> :
                                (pageable.data.map((post, index) => {
                                    return <tr key={post.id}>
                                        <td data-label="#">{((pageable.pagination.page - 1) * pageable.pagination.pageSize) + index + 1}</td>
                                        <td data-label={t('description')}>{post.description[i18n.language as keyof typeof post.description]}</td>
                                        <td data-label={t('createdBy')}>{post.createdBy}</td>
                                        <td>
                                            <Link href={`/data/post/${post.id}`}>{t('detail')}</Link>
                                        </td>
                                    </tr>
                                }))
                        }
                    </tbody>
                </table>
                {pageable && pageable.data.length > 0 && <Paging pagination={pageable?.pagination} />}
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

    const { data: pageable } = await getPosts(clientInfo, { page, keyword, tag });

    return {
        props: {
            pageable,
            authorized: isAuthorize(clientInfo, [BLOG_ADMIN, BLOG_OWNER])
        }
    }
})

function getRequestParams(context: GetServerSidePropsContext) {
    const locale = context.locale ?? 'id';
    const requestParams: RequestParams = { page: 1 };

    if (context.query?.tag && context.query.tag.length > 2) {
        requestParams.tag = context.query.tag as string
    }

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