import * as Switch from '@radix-ui/react-switch';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


export default function LanguageSwitcher() {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleOnCheckedChange = (checked: boolean) => {
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: checked ? 'en' : 'id' }) ;
    }

    return (
        <div className="relative w-[74px] h-[36px] flex items-center justify-center text-sm border border-stone-300 order-1 sm:order-2">
            <div className='w-full absolute text-gray-500 flex items-center justify-center text-center'>
                <div className='w-[30px]'>ID</div>
                <div className='w-[30px]'>EN</div>
            </div>
            <Switch.Root
                checked={i18n.language === 'en'} onCheckedChange={handleOnCheckedChange}
                className="language-switcher w-full h-full bg-transparent relative outline-none cursor-default"
                id="language-switcher" >
                <Switch.Thumb className="flex items-center justify-center w-1/2 h-full border border-stone-100 bg-gradient-to-b from-lime-400 via-lime-600 to-lime-600 text-white  transition-transform duration-100 will-change-transform data-[state=checked]:translate-x-[100%]">
                    {i18n.language === 'id' ? 'ID' : 'EN'}
                </Switch.Thumb>
            </Switch.Root>
        </div>
    )
}