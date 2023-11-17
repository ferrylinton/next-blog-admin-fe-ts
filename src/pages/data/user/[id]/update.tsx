import BreadCrumb from '@/components/BreadCrumb';
import NotFound from '@/components/NotFound';
import UserForm from '@/components/user/user-form';
import { MODIFY_USER_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getAuthorities } from '@/services/authority-service';
import { getUser } from '@/services/user-service';
import { withAuth } from '@/services/wrapper-service';
import { Authority } from '@/types/authority-type';
import { ClientInfo } from '@/types/common-type';
import { User } from '@/types/user-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type Props = {
    user?: User,
    authorities: Authority[]
    clientInfo: ClientInfo
}

export default function UserUpdatePage({ user, authorities, clientInfo }: Props) {

    const router = useRouter();

    const { t } = useTranslation('common');

    if (user) {
        const { password, ...rest } = user;
        return <UserForm user={rest} authorities={authorities} clientInfo={clientInfo} />
    } else {
        return <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('user'), url: `/data/user` },
                        { label: router.query.id as string, url: `/data/user/${router.query.id as string}` },
                        { label: t('update') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <NotFound id={router.query.id} />
            </div>
        </div>
    }
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const id = context.params?.id as string;
    const clientInfo = getClientInfo(context);
    const { data: user } = await getUser(id, clientInfo);
    const { data: authorities } = await getAuthorities(clientInfo);

    return {
        props: {
            user,
            authorities,
            authorized: isAuthorize(clientInfo, [MODIFY_USER_DATA])
        }
    }
})