import AddIcon from '@/icons/AddIcon';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    url: string
}

export default function AddButtonLink({ url }: Props) {

    const { t } = useTranslation('common');

    const router = useRouter();

    return (
        <button
            className='btn btn-link'
            onClick={() => router.push(url)}>
            <AddIcon className='w-[20px] h-[20px]' />
            <span>{t('add')}</span>
        </button>
    )
}