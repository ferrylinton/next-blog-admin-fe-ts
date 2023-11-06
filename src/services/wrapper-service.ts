import { logger } from '@/configs/winston';
import { getClientInfo } from '@/libs/auth-util';
import { redirectTo403, redirectToLogin, redirectToPath } from '@/libs/redirect-util';
import { MessageError } from '@/types/response-type';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { checkToken } from './auth-service';



export function withAuth(gssp: GetServerSideProps) {
    return async (context: GetServerSidePropsContext) => {
        logger.info(`[${context.locale}] : ${context.resolvedUrl}`);

        const clientInfo = getClientInfo(context);
        const url = new URL(context.req.url || '', `http://${context.req.headers.host}`);
        const ssrConfig = await serverSideTranslations(context.locale ?? 'id', ['common']);

        try {
            if (!clientInfo.authData && url.pathname !== '/login') {
                return redirectToLogin(clientInfo.locale);
            } 

            const gsspData = await gssp(context);
            const props = 'props' in gsspData ? gsspData.props : {};
            

            if ('hasAuthority' in props && !clientInfo.authData?.authorities.includes(props.hasAuthority)) {
                return redirectTo403(clientInfo.locale, context.resolvedUrl)
            }

            return {
                props: {
                    clientInfo,
                    ...props,
                    ...ssrConfig
                }
            }
            
        } catch (error: any) {
            logger.error(error);
            const messageError: MessageError = { message: error.message }

            if (axios.isAxiosError(error)) {
                const response = error?.response

                if (response && response.status === 401) {
                    return redirectToLogin(context.locale);
                } else if (response && response.status === 403) {
                    return redirectTo403(context.locale, context.resolvedUrl);
                } else if (response && response.status === 404) {
                    return {
                        props: {
                            clientInfo,
                            ...ssrConfig
                        }
                    }
                }
            }

            return {
                props: {
                    clientInfo,
                    messageError,
                    ...ssrConfig
                }
            }
        }
    }
}

