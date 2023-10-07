import SearchIcon from '@/icons/SearchIcon';
import TagIcon from '@/icons/TagIcon';
import { useTranslation } from 'next-i18next';


type Props = {
    tag?: string,
    keyword?: string,
    total: number
}

export default function PagingInfo({ tag, keyword, total }: Props) {

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    return (
        <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-between my-5 px-2 md:px-0 border-b-4 border-lime-500'>
            <div className='flex'>
                {tag && <div className='flex justify-center items-center gap-2 py-2 text-xl'>
                    <TagIcon className='w-[15px] h-[15px]' />
                    <span className='capitalize'>{t('tag')}</span>
                    <span>: </span>
                    <span>{tag}</span>
                </div>}
                {keyword && <div className='flex justify-center items-center gap-2 py-2 text-xl'>
                    <SearchIcon className='w-[15px] h-[15px]' />
                    <span className='capitalize'>{t('keyword')}</span>
                    <span>: </span>
                    <span>{keyword}</span>
                </div>}
            </div>

            <div className='flex justify-center items-center gap-2 py-2 text-xl'>
                <span className='capitalize'>{t('total')}</span>
                <span>: </span>
                <span>{total}</span>
            </div>
        </div>
    )
}