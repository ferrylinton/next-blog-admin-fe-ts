import TagForm from '@/components/tag/tag-form';
import { withAuth } from '@/services/wrapper-service';
import { PageProps } from '@/types/common-type';
import { GetServerSidePropsContext } from 'next';


export default function AuthorityCreatePage({ clientInfo }: PageProps) {
    return <TagForm tag={{ name: '' }} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common'],
        }
    }
})