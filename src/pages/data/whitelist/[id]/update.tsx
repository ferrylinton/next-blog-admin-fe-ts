import WhitelistForm from '@/components/whitelist/whitelist-form';
import { MODIFY_WHITELIST_DATA } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getWhitelist } from '@/services/whitelist-service';
import { withAuth } from '@/services/wrapper-service';
import { WhitelistPageProps } from '@/types/whitelist-type';
import { GetServerSidePropsContext } from 'next';


export default function WhitelistUpdatePage({ whitelist, clientInfo }: WhitelistPageProps) {
    const { id, ip, description } = whitelist;
    return <WhitelistForm whitelist={{ id, ip, description }} clientInfo={clientInfo} />
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