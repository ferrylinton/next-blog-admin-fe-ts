import PostMetaInfo from '@/components/PostMetaInfo';
import { fetchPostBySlug } from '@/services/post-service';
import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const POST_BY_SLUG_KEY: string = 'PostBySlug'

type Props = {
    slug: string
}

export default function PostBySlug({ slug }: Props) {

    const { i18n } = useTranslation('common');

    const { data: post } = useQuery([POST_BY_SLUG_KEY, slug], () => fetchPostBySlug(slug));

    return (
        <div className='w-full h-full grow flex justify-center items-start px-2 pt-[50px] pb-5'>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col'>
                {post &&
                    <div>
                        <div className='my-4'>
                            <PostMetaInfo post={post} />
                        </div>
                        <div
                            className="markdown"
                            dangerouslySetInnerHTML={{ __html: post?.content[i18n.language as keyof typeof post.content] }} />
                    </div>
                }
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);
    const slug = context.params?.slug as string;
    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: [POST_BY_SLUG_KEY, slug],
        queryFn: () => fetchPostBySlug(slug),
    })

    return {
        props: {
            slug,
            dehydratedState: dehydrate(queryClient),
            ...props
        },
    };
}