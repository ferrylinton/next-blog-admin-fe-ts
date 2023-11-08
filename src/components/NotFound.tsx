import NotFoundIcon from '@/icons/NotFoundIcon'
import { useTranslation } from 'next-i18next';
import React from 'react'

type Props = {
    id: string | string[] | undefined
}

export default function NotFound({ id }: Props) {

    const { t } = useTranslation('common');

    return (
        <div className='w-full mt-16 flex flex-col gap-6 justify-center items-center text-stone-600'>
            <NotFoundIcon className='w-[80px] h-[80px]' />
            <div className='leading-none uppercase text-sm'>{t("dataNotFound")}</div>
            <div className='leading-none text-stone-700 text-sm bg-stone-200 px-5 py-2 rounded-full'>ID : {id}</div>
        </div>
    )
}