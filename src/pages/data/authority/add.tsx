import AuthorityForm from '@/components/authority/authority-form';
import { MODIFY_USER_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { withAuth } from '@/services/wrapper-service';
import { PageProps } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';



export default function AuthorityCreatePage({ clientInfo }: PageProps) {
    return <AuthorityForm authority={{ code: '', description: '' }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);

    return {
        props: {
            authorized: isAuthorize(clientInfo, [MODIFY_USER_DATA])
        }
    }
})