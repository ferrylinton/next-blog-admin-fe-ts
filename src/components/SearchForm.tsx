'use client';

import CloseIcon from '@/icons/CloseIcon';
import SearchIcon from '@/icons/SearchIcon';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, FocusEvent, useRef, useState } from 'react';


export default function SearchForm() {

    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const [keyword, setKeyword] = useState<string>(typeof router.query?.keyword === "string" ? router.query.keyword : '');


    const handleFocus = (event: FocusEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (inputRef.current && keyword.length === 0) {
            inputRef.current.focus();
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        setKeyword(event.target.value.replace(/\s/g, ''));
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if (inputRef.current && keyword.length === 0) {
            inputRef.current.focus();
        } else {
            event.currentTarget.submit();
        }

    }

    const handleReset = () => {
        setKeyword('');
        router.push('/post', undefined, { locale: i18n.language });
    }

    const { i18n } = useTranslation('common');

    const { t } = i18n;

    return (
        <form
            action='/post'
            onSubmit={handleSubmit}
            noValidate
            autoComplete='off'
            className='search-bar'>

            <button type="submit" onFocus={handleFocus}>
                <SearchIcon />
            </button>
            <input
                ref={inputRef}
                type="text"
                name="keyword"
                onChange={handleChange}
                placeholder={t('keyword')}
                value={keyword}
                maxLength={20} />
            {keyword && keyword.length > 0 &&
                <button type="button" onClick={() => handleReset()}>
                    <CloseIcon />
                </button>}

        </form>
    )


}