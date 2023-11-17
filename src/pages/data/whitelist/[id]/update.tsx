import BreadCrumb from '@/components/BreadCrumb';
import NotFound from '@/components/NotFound';
import WhitelistForm from '@/components/whitelist/whitelist-form';
import { MODIFY_WHITELIST_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getWhitelist } from '@/services/whitelist-service';
import { withAuth } from '@/services/wrapper-service';
import { WhitelistPageProps } from '@/types/whitelist-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


export default function WhitelistUpdatePage({ whitelist, clientInfo }: WhitelistPageProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    if(whitelist){
        const { id, ip, description } = whitelist;
        return <WhitelistForm whitelist={{ id, ip, description }} clientInfo={clientInfo} />
    }else{
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
    const { data } = await getWhitelist(id, clientInfo);

    return {
        props: {
            whitelist: data,
            authorized: isAuthorize(clientInfo, [MODIFY_WHITELIST_DATA])
        }
    }
})