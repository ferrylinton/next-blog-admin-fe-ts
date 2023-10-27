import AuthorityForm from '@/components/authority/authority-form';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';


export default function AuthorityCreatePage(clientInfo: ClientInfo) {
    return <AuthorityForm clientInfo={clientInfo}/>
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common'],
        }
    }
})