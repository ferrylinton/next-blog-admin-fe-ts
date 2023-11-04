import UserForm from '@/components/user/user-form';
import { getClientInfo } from '@/libs/auth-util';
import { getAuthorities } from '@/services/authority-service';
import { getUser } from '@/services/user-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { ClientInfo } from '@/types/common-type';
import { User } from '@/types/user-type';
import { GetServerSidePropsContext } from 'next';

type Props = {
    user: User,
    authorities: Authority[]
    clientInfo: ClientInfo
}

export default function UserUpdatePage({ user, authorities, clientInfo }: Props) {
    const {password,  ...rest} = user;
    return <UserForm user={rest} authorities={authorities} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: user } = await getUser(id, clientInfo);
    const { data: authorities } = await getAuthorities(clientInfo);

    return {
        props: {
            namespaces: ['common'],
            user,
            authorities
        }
    }
})