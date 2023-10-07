import { GetStaticPropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function NotFoundPage() {
    return (
        <div className='w-full h-full grow flex flex-col justify-center items-center'>
            <div>404</div>
            <div>Page is not found</div>
        </div>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common'])

    return {
        props: {
            ...props
        },
    };
}