'use client';

import { useTags } from '@/hooks/tag-hook';
import AngelDownIcon from '@/icons/AngelDownIcon';
import CheckIcon from '@/icons/CheckIcon';
import TagsIcon from '@/icons/TagsIcon';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';


export default function TagMenu() {

    const { data: tags } = useTags();

    const [open, setOpen] = useState(false);

    const router = useRouter();

    const selected = (typeof router.query?.tag === "string") ? router.query.tag : null;

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    const handleSelectTag = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setOpen(false);
        router.push(event.currentTarget.href, undefined, { locale: i18n.language });
    }

    const getSelectedLabel = () => {
        if (selected) {
            return selected;
        } else {
            return (router.pathname === '/post') ? t('allTag') : t('selectTag');
        }
    }

    return (
        <>
            <div className='relative'>
                <button className={`h-[36px] px-3 relative flex gap-2 items-center justify-center text-sm border text-stone-500 border-stone-300 ${open ? 'ring-2 ring-lime-200' : ''}`} onClick={() => setOpen(!open)}>
                    <TagsIcon className='w-[20px] h-[20px] md:hidden' />
                    <span className='uppercase leading-none hidden md:inline-block'>{getSelectedLabel()}</span>
                    <AngelDownIcon className='w-[10px] h-[10px]' />
                </button>
                <div className={`absolute top-[calc(100%+2px)] z-[53] right-0 w-48 bg-white ${open ? 'animate-slideDownAndFade' : 'hidden'}`}>
                    <div className='flex flex-col items-center justify-center p-2 border border-stone-300 shadow-[0px_5px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_5px_20px_-15px_rgba(22,_23,_24,_0.2)]'>
                        {
                            <Link key='allTag'
                                className='relative w-full py-1 ps-6 px-2 uppercase border border-white hover:bg-lime-100 hover:border-lime-300'
                                onClick={handleSelectTag}
                                href='/post'>
                                {!selected &&  router.pathname === '/post' && <CheckIcon className='absolute text-lime-600 left-[5px] top-1/2 -translate-y-1/2  w-[12px] h-[12px]' />}
                                <span className='inline-block leading-none'>{t('allTag')}</span>
                            </Link>
                        }
                        {
                            tags && tags.map((tag) => {
                                return (
                                    <Link
                                        key={tag.name}
                                        className='relative w-full py-1 ps-6 px-2 uppercase border border-white hover:bg-lime-100 hover:border-lime-300'
                                        onClick={handleSelectTag}
                                        href={`/post?tag=${tag.name}`}>
                                        {selected === tag.name && <CheckIcon className='absolute text-lime-600 left-[5px] top-1/2 -translate-y-1/2  w-[12px] h-[12px]' />}
                                        <span className='inline-block leading-none'>{tag.name}</span>
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div onClick={() => setOpen(false)} className={clsx('bg-transparent fixed inset-0 z-[52]', !open && 'hidden')} />
        </>
    );
};
