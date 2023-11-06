import BreadCrumb from '@/components/BreadCrumb';
import NotFoundIcon from '@/icons/NotFoundIcon';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';


export default function NotFoundPage() {

    const router = useRouter();

    const { t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: '404' }
                    ]} />
            </div>
            <div className='mt-16 flex flex-col gap-6 justify-center items-center text-stone-600'>
                <NotFoundIcon className='w-[80px] h-[80px]' />
                <div className='leading-none uppercase text-sm'>{t("pageNotFound")}</div>
                <div className='leading-none text-stone-700 text-sm bg-stone-200 px-5 py-2 rounded-full'>URL : {router.asPath}</div>
            </div>
        </div>
    )
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);

    return {
        props: {
            ...props
        },
    };
}