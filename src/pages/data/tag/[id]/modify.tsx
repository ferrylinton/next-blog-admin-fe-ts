import AuthorityForm from '@/components/authority/authority-form';
import { COOKIE_TOKEN } from '@/configs/constant';
import { getAuthority } from '@/services/authority-service';
import { withAuth } from '@/services/wrapper-service';
import { AuthorityProps } from '@/types/authority-type';
import { GetServerSidePropsContext } from 'next';


export default function AuthorityUpdatePage({authority, clientInfo}: AuthorityProps) {
    console.log(authority);
    return <AuthorityForm authority={authority} clientInfo={clientInfo}/>
}

export const getServerSideProps = withAuth(async ({ req, params, locale }: GetServerSidePropsContext) => {
    const id = params?.id as string;
    const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';
    const token = req.cookies[COOKIE_TOKEN];
    const { data } = await getAuthority(id, { locale: locale || 'id', clientIp: clientIp as string, userAgent, token: token as string });
    
    return {
        props: {
            namespaces: ['common'],
            authority: data
        }
    }
})