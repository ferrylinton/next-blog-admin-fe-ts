import PostForm from '@/components/post/post-form';
import { getClientInfo } from '@/libs/client-info-util';
import { getTags } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { PostFormData, PostPageProps } from '@/types/post-type';
import { GetServerSidePropsContext } from 'next';



export default function PostCreatePage({tags, clientInfo} : PostPageProps) {
    const post: PostFormData = {
        id: '',
        slug: '',
        title: {
            id: '',
            en: ''
        },
        description: {
            id: '',
            en: ''
        },
        content: {
            id: '',
            en: ''
        },
        tags: [],

    }

    return <PostForm post={post} tags={tags} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const { data } = await getTags(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            tags: data
        }
    }
})