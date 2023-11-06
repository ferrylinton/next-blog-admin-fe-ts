import AuthorityForm from '@/components/authority/authority-form';
import { MODIFY_USER_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-util';
import { getAuthority } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { AuthorityPageProps } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';


export default function AuthorityUpdatePage({ authority, clientInfo }: AuthorityPageProps) {
    const router = useRouter();

    if(authority){
        const { id, code, description } = authority;
        return <AuthorityForm authority={{ id, code, description }} clientInfo={clientInfo} />
    }else{
        router.push('/data/authority');
    }
    
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data } = await getAuthority(id, clientInfo);

    return {
        props: {
            authority: data,
            hasAuthority: MODIFY_USER_DATA
        }
    }
})