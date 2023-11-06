import BreadCrumb from '@/components/BreadCrumb';
import { withAuth } from '@/services/wrapper-service';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
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
                    className='w-[80px] h-[80px]'
                    fillRule="evenodd"
                    clipRule="evenodd">
                    <path d="M17.825 24h-15.825v-24h10.189c3.162 0 9.811 7.223 9.811 9.614v10.071l-2-2v-7.228c0-4.107-6-2.457-6-2.457s1.517-6-2.638-6h-7.362v20h11.825l2 2zm-2.026-4.858c-.799.542-1.762.858-2.799.858-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1-.294 1.932-.801 2.714l4.801 4.872-1.414 1.414-4.787-4.858zm-2.799-7.142c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z" />
                </svg>
                <div className='text-3xl font-bold leading-none'>403</div>
                <div className='leading-none uppercase font-bold'>{t("forbidden")}</div>
                {router.query.url && <div className='leading-none text-stone-700 text-sm bg-stone-200 px-4 py-2 rounded-full'>URL : {router.query.url}</div>}
            </div>
        </div>
    )
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    return {
        props: {
            namespaces: ['common'],
        }
    }
})