import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export const serverSidePropsWrapper = async (context: GetServerSidePropsContext) => {

}

export const getSimpleServerSideProps = async (context: GetServerSidePropsContext) => {
    const locale = context.locale ?? 'id';
    const ssrConfig = await serverSideTranslations(locale, ['common']);

    return {
        props: {
            ...ssrConfig
        },
    };
}