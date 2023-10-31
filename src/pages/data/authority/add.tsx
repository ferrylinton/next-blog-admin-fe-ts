import AuthorityForm from '@/components/authority/authority-form';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';

type Props = {
    clientInfo: ClientInfo
}

export default function AuthorityCreatePage({ clientInfo }: Props) {
    return <AuthorityForm
        authority={{ code: '', description: '' }}
        clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common'],
        }
    }
})