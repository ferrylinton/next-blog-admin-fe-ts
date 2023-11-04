import ChangePasswordForm from '@/components/user/change-password-form';
import { withAuth } from '@/services/wrapper-service';
import { AuthData } from '@/types/auth-type';
import { ClientInfo } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';

type Props = {
    clientInfo: ClientInfo
}

export default function ChangePasswordPage({ clientInfo }: Props) {
    const authData = clientInfo.authData as AuthData;
    return <ChangePasswordForm username={authData.username} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common']
        }
    }
})