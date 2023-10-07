import Paging from '@/components/Paging';
import PostItem from '@/components/PostItem';
import { Pageable } from '@/types/common-type';
import { Post } from '@/types/post-type';
import { useTranslation } from 'next-i18next';


type Props = {
    tag?: string
    keyword?: string,
    pageable?: Pageable<Post>
}

export default function PostList({tag, keyword, pageable} : Props) {

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    return (
        <>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col justify-center'>
                
                <div className="w-full flex flex-col flex-wrap gap-2 px-2 md:px-0">
                    {
                        pageable && pageable.data.map((post, index) => <PostItem key={index} post={post} />)
                    }
                    {
                        pageable && pageable.data.length === 0 &&
                        <div className='border border-stone-200 bg-stone-50 px-3 py-6 text-center'>{t('dataIsEmpty')}</div>
                    }
                </div>
            </div>
            {pageable && pageable.data.length > 0 && <Paging pagination={pageable?.pagination} />}
        </>
    )
}
