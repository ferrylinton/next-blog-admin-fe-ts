import BreadCrumb from '@/components/BreadCrumb';
import ErrorIcon from '@/icons/ErrorIcon';
import { GetStaticPropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function ErrorPage() {

    const { t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: 'Error' }
                    ]} />
            </div>
            <div className='mt-16 flex flex-col gap-6 justify-center items-center text-red-700'>
                <ErrorIcon className='w-[80px] h-[80px]' />
                <div className='text-4xl font-bold'>ERROR</div>
                <div className='leading-none uppercase text-sm'>{t("internalServerError")}</div>
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