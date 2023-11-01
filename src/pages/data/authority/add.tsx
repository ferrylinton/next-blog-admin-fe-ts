import AuthorityForm from '@/components/authority/authority-form';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo, PageProps } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';



export default function AuthorityCreatePage({ clientInfo }: PageProps) {
    return <AuthorityForm authority={{ code: '', description: '' }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common'],
        }
    }
})