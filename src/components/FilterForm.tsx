import CloseIcon from '@/icons/CloseIcon';
import SearchIcon from '@/icons/SearchIcon';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, FocusEvent, useRef, useState } from 'react';


type Props = {
    filter: (keyword?: string) => void;
}

export default function FilterForm({ filter }: Props) {

    const [keyword, setKeyword] = useState<string>('');

    const inputRef = useRef<HTMLInputElement>(null);

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
            filter(keyword);
        }

    }

    const handleReset = () => {
        setKeyword('');
        filter();
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