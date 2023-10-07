import CalendarIcon from '@/icons/CalendarIcon';
import TagIcon from '@/icons/TagIcon';
import { Post } from '@/types/post-type';
import { getPostDate } from '@/utils/date-util';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

type Props = {
    post: Post
}

export default function PostMetaInfo({ post }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleSelectTag = (tag: string) => {
        router.push(`/post?tag=${tag}`, undefined, { locale: i18n.language });
    }

    return (
        <div className='flex gap-3 text-sm uppercase'>
            <div className="flex justify-center items-center gap-1 leading-none py-1 border-b border-gray-400 ">
                <CalendarIcon className='w-[15px] h-[15px]' />
                <span>{getPostDate(post)}</span>
            </div>
            <div className='flex gap-3'>
                {
                    post.tags.map(tag => {
                        return (<div key={tag} onClick={() => handleSelectTag(tag)} className='flex justify-center items-center gap-1 leading-none py-1 border-b border-stone-400 cursor-pointer'>
                            <TagIcon className='w-[15px] h-[15px]' />
                            <span>{tag}</span>
                        </div>)
                    })
                }
            </div>
        </div>
    )
}
