import TagForm from '@/components/tag/tag-form';
import { getClientInfo } from '@/libs/auth-util';
import { getTag } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { TagPageProps } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';


export default function TagUpdatePage({ tag, clientInfo }: TagPageProps) {
    const { id, name } = tag;
    return <TagForm tag={{ id, name }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data } = await getTag(id, clientInfo);

    return {
        props: {
            namespaces: ['common'],
            tag: data
        }
    }
})