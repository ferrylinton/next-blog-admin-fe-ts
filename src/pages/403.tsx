import BreadCrumb from '@/components/BreadCrumb';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';


export default function ForbiddenPage() {

    const router = useRouter()

    const { t } = useTranslation('common');

    return (
        <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: 'Forbidden' }
                    ]} />
            </div>
            <div className='mt-16 flex flex-col gap-4 justify-center items-center text-stone-600'>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className='w-[80px] h-[80px]'>
                    <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10 0-2.397.85-4.6 2.262-6.324l11.197 11.209.004-.008 2.861 2.861c-1.724 1.412-3.927 2.262-6.324 2.262zm7.738-3.676l-3.312-3.313c.61-1.215 1.393-2.768 1.478-2.97.066-.144.096-.278.096-.401 0-.81-1.276-1.127-1.697-.324-.007.01-.757 1.388-.872 1.604-.124.228-.494.18-.494-.118v-5.326c0-.839-1.348-.814-1.348 0v4.696l-.453-.451-.002-5.065c0-.44-.355-.656-.714-.656-.363 0-.729.222-.729.656v3.62l-.437-.437v-2.429c0-.861-1.476-.885-1.476 0v.954l-4.102-4.102c1.724-1.412 3.927-2.262 6.324-2.262 5.514 0 10 4.486 10 10 0 2.397-.85 4.6-2.262 6.324zm-11.736-7.483l6.768 6.769c-.35.236-.8.39-1.429.39h-2.935c-1.575 0-2.406-.85-2.406-2.337l.002-4.822z"/>
                </svg>
                <div className='text-3xl font-bold leading-none'>403</div>
                <div className='leading-none uppercase font-bold'>{t("forbidden")}</div>
                {router.query.url && <div className='leading-none text-stone-700 text-sm bg-stone-200 px-4 py-2 rounded-full'>URL : {router.query.url}</div>}
            </div>
        </div>
    )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const props = await serverSideTranslations(context.locale ?? 'id', ['common']);

    return {
        props: {
            ...props
        },
    };
}