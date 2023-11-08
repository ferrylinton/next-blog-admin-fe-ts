import ChangePasswordForm from '@/components/user/change-password-form';
import { MODIFY_USER_DATA, READ_USER_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getUser } from '@/services/user-service';
import { withAuth } from '@/services/wrapper-service';
import { ClientInfo } from '@/types/common-type';
import { User } from '@/types/user-type';
import { GetServerSidePropsContext } from 'next';

type Props = {
    user: User,
    clientInfo: ClientInfo
}

export default function ChangePasswordByIdPage({ user, clientInfo }: Props) {
    const { id, username } = user;
    return <ChangePasswordForm id={id} username={username} clientInfo={clientInfo} />
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: user } = await getUser(id, clientInfo);

    return {
        props: {
            user,
            authorized: isAuthorize(clientInfo, [READ_USER_DATA, MODIFY_USER_DATA])
        }
    }
})