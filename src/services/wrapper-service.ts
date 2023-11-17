import { logger } from '@/configs/winston';
import { getClientInfo } from '@/libs/auth-data-util';
import { redirectTo403, redirectTo429, redirectTo503, redirectToLogin } from '@/libs/redirect-util';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


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

            if ("authorized" in props && props.authorized) {
                return {
                    props: {
                        clientInfo,
                        ...props,
                        ...ssrConfig
                    }
                }
            } else {
                return redirectTo403(clientInfo.locale, context.resolvedUrl)
            }

        } catch (error: any) {
            logger.error(error);

            if (axios.isAxiosError(error)) {
                const response = error?.response

                if (response && response.status === 401) {
                    return redirectToLogin(context.locale);
                } else if (response && response.status === 403) {
                    return redirectTo403(context.locale, context.resolvedUrl);
                } else if (response && response.status === 503) {
                    return redirectTo503(context.locale);
                } else if (response && response.status === 429) {
                    return redirectTo429(context.locale);
                } else if (response && response.status === 404) {
                    return {
                        props: {
                            clientInfo,
                            messageError: { message: error.message },
                            ...ssrConfig
                        }
                    }
                }
            }

            return {
                props: {
                    clientInfo,
                    messageError: { message: error.message },
                    ...ssrConfig
                }
            }
        }
    }
}

