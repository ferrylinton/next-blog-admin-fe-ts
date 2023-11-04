import PostForm from '@/components/post/post-form';
import { getClientInfo } from '@/libs/auth-util';
import { getPost } from '@/services/post-service';
import { getTags } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { Post } from '@/types/post-type';
import { Tag } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';

type Props = {
    post: Post,
    tags: Tag[]
    clientInfo: ClientInfo
}

export default function PostUpdatePage({ post, tags, clientInfo }: Props) {
    return <PostForm post={post} tags={tags} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: post } = await getPost(id, clientInfo);
    const { data: tags } = await getTags(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            post,
            tags
        }
    }
})