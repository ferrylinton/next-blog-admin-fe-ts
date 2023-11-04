import { logger } from '@/configs/winston';
import { getClientInfo } from '@/libs/auth-util';
import { errorHandler } from '@/libs/axios-util';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export function withAuth(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {

        try {
            const url = new URL(context.req.url || '', `http://${context.req.headers.host}`);
            const clientInfo = getClientInfo(context);
            logger.info(context.resolvedUrl);
            
            if (!clientInfo.authData && url.pathname !== '/login') {
                return {
                    redirect: {
                        destination: clientInfo.locale === 'id' ? '/login' : `/${clientInfo.locale}/login`,
                        permanent: false
                    }
                }
            }else if(clientInfo.authData && url.pathname === '/login'){
                return {
                    redirect: {
                        destination: clientInfo.locale === 'id' ? '/' : `/${clientInfo.locale}/`,
                        permanent: false
                    }
                }
            }

            
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
            logger.error(error);
            return errorHandler(error);
        }
    }
}

