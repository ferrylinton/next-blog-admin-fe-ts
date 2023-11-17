import BreadCrumb from '@/components/BreadCrumb';
import NotFound from '@/components/NotFound';
import AuthorityForm from '@/components/authority/authority-form';
import { MODIFY_USER_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getAuthority } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { AuthorityPageProps } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


export default function AuthorityUpdatePage({ authority, clientInfo }: AuthorityPageProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    if (authority) {
        const { id, code, description } = authority;
        return <AuthorityForm authority={{ id, code, description }} clientInfo={clientInfo} />
    } else {
        return <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('authority'), url: `/data/authority` },
                        { label: router.query.id as string, url: `/data/authority/${router.query.id as string}` },
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
    const { data: authority } = await getAuthority(id, clientInfo);

    return {
        props: {
            authority,
            authorized: isAuthorize(clientInfo, [MODIFY_USER_DATA]) || (authority.createdBy === clientInfo.authData?.username)
        }
    }
})