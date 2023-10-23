import CloseIcon from '@/icons/CloseIcon';
import SearchIcon from '@/icons/SearchIcon';
import { Authority } from '@/types/authority-type';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { ChangeEvent, Dispatch, FocusEvent, SetStateAction, useRef, useState, useEffect } from 'react';

type Props = {
    authorities: Authority[],
    setFiltered: Dispatch<SetStateAction<Authority[]>>
}

export default function FilterForm({ authorities, setFiltered }: Props) {

    const [isClient, setIsClient] = useState(false)

    const inputRef = useRef<HTMLInputElement>(null);

    const router = useRouter();

    const [keyword, setKeyword] = useState<string>(typeof router.query?.keyword === "string" ? router.query.keyword : '');

    // useEffect(() => {
    //     setIsClient(true)
    // }, [])

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
            setFiltered(authorities.filter(el => el.code.toLowerCase().includes(keyword.toLowerCase()) ||
                el.description.toLowerCase().includes(keyword.toLowerCase())))
        }

    }

    const handleReset = () => {
        setKeyword('');
        setFiltered(authorities);
    }

    const { t } = useTranslation('common');

    return (
        <form
            action='#'
            onSubmit={handleSubmit}
            noValidate
            autoComplete='off'
            className='filter-form'>

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