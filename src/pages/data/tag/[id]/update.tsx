import BreadCrumb from '@/components/BreadCrumb';
import NotFound from '@/components/NotFound';
import TagForm from '@/components/tag/tag-form';
import { BLOG_OWNER } from '@/configs/auth-constant';
import { getClientInfo } from '@/libs/auth-data-util';
import { isAuthorize } from '@/libs/auth-util';
import { getTag } from '@/services/tag-service';
import { withAuth } from '@/services/wrapper-service';
import { TagPageProps } from '@/types/tag-type';
import { GetServerSidePropsContext } from 'next';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


export default function TagUpdatePage({ tag, clientInfo }: TagPageProps) {

    const router = useRouter();

    const { t } = useTranslation('common');

    if(tag){
        const { id, name } = tag;
        return <TagForm tag={{ id, name }} clientInfo={clientInfo} />
    }else{
        return <div className='w-full h-full grow flex flex-col justify-start items-center pt-[50px] pb-5'>
            <div className='w-full bg-stone-100 flex justify-center items-center text-stone-500'>
                <BreadCrumb
                    items={[
                        { label: t('tag'), url: `/data/tag` },
                        { label: router.query.id as string, url: `/data/tag/${router.query.id as string}` },
                        { label: t('update') }
                    ]} />
            </div>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col items-start px-2'>
                <NotFound id={router.query.id} />
            </div>
        </div>
    }
    
}

export const getServerSideProps = withAuth(async (context: GetServerSidePropsContext) => {
    const clientInfo = getClientInfo(context);
    const id = context.params?.id as string;
    const { data } = await getTag(id, clientInfo);

    return {
        props: {
            tag: data,
            authorized: isAuthorize(clientInfo, [BLOG_OWNER]) || ( data.createdBy === clientInfo.authData?.username)
        }
    }
})