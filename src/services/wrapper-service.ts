import { COOKIE_TOKEN } from '@/configs/constant';
import { errorHandler } from '@/libs/axios-util';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export function withAuth(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {

        try {
            if (!context.req.cookies[COOKIE_TOKEN]) {
                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }

            const { req, locale } = context;
            
            const clientIp = req.headers["x-real-ip"] || req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
            const userAgent = req.headers['user-agent'] || '';
            const token = req.cookies[COOKIE_TOKEN];

            const gsspData = await gssp(context);
            const props = 'props' in gsspData ? gsspData.props : {};
            const namespaces = 'namespaces' in props ? props.namespaces : [];
            console.log(namespaces);
            const ssrConfig = await serverSideTranslations(locale ?? 'id', namespaces);

            return {
                props: {
                    locale: locale ?? 'id',
                    clientIp,
                    userAgent,
                    token,
                    ...('props' in gsspData ? gsspData.props : {}),
                    ...ssrConfig
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }
}

