import TagForm from '@/components/tag/tag-form';
import { BLOG_OWNER } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getTag } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { TagPageProps } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';


export default function TagUpdatePage({ tag, clientInfo }: TagPageProps) {
    const { id, name } = tag;
    return <TagForm tag={{ id, name }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const id = context.params?.id as string;
    const { data } = await getTag(id, clientInfo);

    return {
        props: {
            tag: data,
            authorized: isAuthorize(clientInfo, [BLOG_OWNER]) || ( data.createdBy === clientInfo.authData?.username)
        }
    }
})