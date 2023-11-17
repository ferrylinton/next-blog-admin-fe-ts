import LastIcon from '@/icons/LastIcon';
import NextIcon from '@/icons/NextIcon';
import { Pagination } from '@/types/common-type';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';


type Props = {
    pagination?: Pagination
}

export default function Paging({ pagination }: Props) {

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const router = useRouter();

    const { pathname, query } = router;

    if (!pagination) {
        return null;
    } else {

        let FirstButton = (pagination.page && pagination.page > 1) ?
            <Link
                href={{ pathname, query: { ...query, page: 1 } }}
                className='w-[60px] h-[40px] btn btn-link'>
                <LastIcon className='w-[30px] h-[30px] rotate-180' />
            </Link> :
            <div className='w-[60px] h-[40px] btn btn-disabled'>
                <LastIcon className='w-[30px] h-[30px] rotate-180' />
            </div>

        let PreviousButton = (pagination.page && pagination.page > 1) ?
            <Link
                href={{ pathname, query: { ...query, page: pagination.page - 1 } }}
                className='w-[60px] h-[40px] btn btn-link'>
                <NextIcon className='w-[30px] h-[30px] rotate-180' />
            </Link> :
            <div className='w-[60px] h-[40px] btn btn-disabled'>
                <NextIcon className='w-[30px] h-[30px] rotate-180' />
            </div>

        let NextButton = (pagination.page && pagination.page < pagination.totalPage) ?
            <Link
                href={{
                    pathname,
                    query: { ...query, page: pagination.page + 1 }
                }}
                className='w-[60px] h-[40px] btn btn-link'>
                <NextIcon className='w-[30px] h-[30px]' />
            </Link> :
            <div className='w-[60px] h-[40px] btn btn-disabled'>
                <NextIcon className='w-[30px] h-[30px]' />
            </div>

        let LastButton = (pagination.page && pagination.page < pagination.totalPage) ?
            <Link
                href={{
                    pathname,
                    query: { ...query, page: pagination.totalPage }
                }}
                className='w-[60px] h-[40px] btn btn-link'>
                <LastIcon className='w-[30px] h-[30px]' />
            </Link> :
            <div className='w-[60px] h-[40px] btn btn-disabled'>
                <LastIcon className='w-[30px] h-[30px]' />
            </div>

        return (
            <div className='flex justify-center align-middle gap-1 flex-wrap px-2 py-4'>
                <div className='h-[40px] px-4 border border-stone-300 text-stone-500 flex items-center justify-center'>
                    {t('pageOf', { page: pagination.page, totalPage: pagination.totalPage })}
                </div>
                {FirstButton}{PreviousButton}{NextButton}{LastButton}
            </div>
        )
    }
}