import PagingInfo from '@/components/PagingInfo';
import PostList from '@/components/PostList';
import { getPostsServerSideProps } from '@/services/post-server-side-service';
import { fetchPosts } from '@/services/post-service';
import { useQuery } from "@tanstack/react-query";
import { useRouter } from 'next/router';


export default function PostPage() {

  const router = useRouter();

  const page = parseInt(typeof router.query?.page === "string" ? router.query.page : '1');

  const keyword = router.query?.keyword as string;

  const tag = router.query?.tag as string;

  const queryKey = ['posts', page || 1, keyword || '', tag || ''];

  const { data: pageable } = useQuery(queryKey,
    () => fetchPosts({ page, keyword, tag }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false
    });


  return (
    <>
      <div className='w-full h-full grow flex flex-col justify-start items-center pt-[70px] px-2 pb-5'>
        <PagingInfo tag={tag} keyword={keyword} total={pageable?.pagination.total || 0} />
        <PostList tag={tag} keyword={keyword} pageable={pageable} />
      </div>
    </>
  )
}

export const getServerSideProps = getPostsServerSideProps;