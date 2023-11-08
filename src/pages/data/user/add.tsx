import UserForm from '@/components/user/user-form';
import { MODIFY_USER_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
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
    const { data: authorities } = await getAuthorities(clientInfo);

    return {
        props: {
            authorities,
            authorized: isAuthorize(clientInfo, [MODIFY_USER_DATA])
        }
    }
})