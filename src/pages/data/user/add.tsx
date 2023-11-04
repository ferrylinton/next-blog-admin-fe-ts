import UserForm from '@/components/user/user-form';
import { getClientInfo } from '@/libs/auth-util';
import { getAuthorities } from '@/services/authority-service';
import { getTags } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { UserFormData, UserPageProps } from '@/types/user-type';
import { GetServerSidePropsContext } from 'next';



export default function UserCreatePage({ authorities, clientInfo }: UserPageProps) {
    const user: UserFormData = {
        id: '',
        username: '',
        email: '',
        password: '',
        passwordConfirm: '',
        authorities: [],

    }

    return <UserForm user={user} authorities={authorities} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const { data } = await getAuthorities(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            authorities: data
        }
    }
})