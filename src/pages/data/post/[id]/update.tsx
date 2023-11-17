import BreadCrumb from '@/components/BreadCrumb';
import NotFound from '@/components/NotFound';
import PostForm from '@/components/post/post-form';
import { BLOG_OWNER } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getPost } from '@/services/post-service';
import { getTags } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { Post } from '@/types/post-type';
import { Tag } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type Props = {
    post?: Post,
    tags: Tag[]
    clientInfo: ClientInfo
}

export default function PostUpdatePage({ post, tags, clientInfo }: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    if(post){
        return <PostForm post={post} tags={tags} clientInfo={clientInfo} />
    }else{
        return <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('user'), url: `/data/user` },
                        { label: router.query.id as string, url: `/data/user/${router.query.id as string}` },
                        { label: t('update') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <NotFound id={router.query.id} />
            </div>
        </div>
    }
    
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: post } = await getPost(id, clientInfo);
    const { data: tags } = await getTags(clientInfo);

    return {
        props: {
            post,
            tags,
            authorized: isAuthorize(clientInfo, [BLOG_OWNER]) && ( post.createdBy === clientInfo.authData?.username)
        }
    }
})