import BreadCrumb from '@/components/BreadCrumb';
import NoServiceIcon from '@/icons/NoServiceIcon';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function ServiceUnavailablePage() {

    const { t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t("serviceUnavailable") }
                    ]} />
            </div>
            <div className='mt-16 flex flex-col gap-4 justify-center items-center text-stone-600'>
                <NoServiceIcon className='w-[80px] h-[80px]' />
                <div className='text-3xl font-bold leading-none'>503</div>
                <div className='leading-none uppercase font-bold'>{t("serviceUnavailable")}</div>
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