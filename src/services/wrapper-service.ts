import { COOKIE_TOKEN } from '@/configs/constant';
import { errorHandler } from '@/libs/axios-util';
import { getClientInfo } from '@/libs/client-info-util';
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

            const clientInfo = getClientInfo(context);
            const gsspData = await gssp(context);
            const props = 'props' in gsspData ? gsspData.props : {};
            const namespaces = 'namespaces' in props ? props.namespaces : ['common'];
            const ssrConfig = await serverSideTranslations(context.locale ?? 'id', namespaces);

            return {
                props: {
                    clientInfo,
                    ...props,
                    ...ssrConfig
                }
            }
        } catch (error) {
            return errorHandler(error);
        }
    }
}

