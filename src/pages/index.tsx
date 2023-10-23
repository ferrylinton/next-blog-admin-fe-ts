import PostItem from '@/components/PostItem';
import PostIcon from '@/icons/PostIcon';
import { fetchPosts } from '@/services/post-service';
import { dehydrate, QueryClient, useQuery } from "@tanstack/react-query";
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const POSTS_KEY = 'POSTS_INDEX';

export default function HomePage() {

  const { i18n } = useTranslation('common');

  const { t } = i18n;

  const { data: pageable } = useQuery([POSTS_KEY], () => fetchPosts());

  return (
    <div className='w-full h-full grow flex flex-col justify-center items-center'>
      <div className={`w-full px-2 pb-5 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col`}>
        <div className='flex justify-start items-center gap-2 pb-2 my-5 border-b-4 border-lime-500'>
          <PostIcon className='w-[20px] h-[20px] font-bold' />
          <span className='text-xl'>{t('recentBlogPosts')}</span>
        </div>
        <div className="flex flex-col flex-wrap gap-1">
          {
            pageable && pageable.data.map((post, index) => <PostItem key={index} post={post} />)
          }
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const props = await serverSideTranslations(context.locale ?? 'id', ['common'])
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [POSTS_KEY],
    queryFn: () => fetchPosts(),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...props
    },
  };
}