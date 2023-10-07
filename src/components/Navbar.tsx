import { Righteous } from 'next/font/google';
import Link from 'next/link';
import LanguageSwitcher from './LanguageSwitcher';
import SearchForm from './SearchForm';
import TagMenu from './TagMenu';


const logoFont = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function Navbar() {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 pb-[40px] bg-gradient-to-b from-stone-300  to-transparent">
            <div className='border-b border-stone-200 bg-white'>
                <div className="h-[50px] px-2 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col sm:flex-row gap-1 items-center justify-center mx-auto">
                    <div className='relative w-full flex items-center justify-between'>
                        <Link href={'/'} className={`uppercase leading-none text-2xl text-[#333] sm:text-3xl ${logoFont.className}`}>
                            <span className='drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>MARMEAM</span>
                            <span className='text-lime-500 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>.COM</span>
                        </Link>
                        <div className='flex gap-1 sm:ml-auto bg-white'>
                            <TagMenu />
                            <SearchForm />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )


}