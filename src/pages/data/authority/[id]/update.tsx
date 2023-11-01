import AuthorityForm from '@/components/authority/authority-form';
import { getClientInfo } from '@/libs/client-info-util';
import { getAuthority } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { AuthorityPageProps } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';


export default function AuthorityUpdatePage({ authority, clientInfo }: AuthorityPageProps) {
    const { id, code, description } = authority;
    return <AuthorityForm authority={{ id, code, description }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data } = await getAuthority(id, clientInfo);

    return {
        props: {
            namespaces: ['common'],
            authority: data
        }
    }
})