import WhitelistForm from '@/components/whitelist/whitelist-form';
import { withAuth } from '@/services/wrapper-service';
import { PageProps } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';



export default function WhitelistCreatePage({ clientInfo }: PageProps) {
    return <WhitelistForm whitelist={{ id: '', description: '' }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common'],
        }
    }
})