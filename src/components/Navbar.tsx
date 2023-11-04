import { Righteous } from 'next/font/google';
import Link from 'next/link';
import DataMenu from './DataMenu';
import LocaleMenu from './LocaleMenu';
import ProfileMenu from './ProfileMenu';
import { AuthData } from '@/types/auth-type';


const logoFont = Righteous({
    weight: "400",
    subsets: ['latin']
});

type Props = {
    authData: AuthData | null;
}

export default function Navbar({ authData }: Props) {

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-stone-200 shadow-[0_0_15px_0_rgba(106,106,106,0.15)]">
            <div className='bg-white'>
                <div className="h-[50px] px-2 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex flex-col sm:flex-row gap-1 items-center justify-center mx-auto">
                    <div className='relative w-full flex gap-2 items-center justify-between'>
                        <Link href={'/'} className={`uppercase leading-none text-2xl text-[#333] sm:text-3xl ${logoFont.className}`}>
                            <span className='drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>MARMEAM</span>
                            <span className='text-lime-500 drop-shadow-[0_1px_1px_rgba(0,0,0,1)]'>.COM</span>
                        </Link>
                        <div className='flex gap-1'>
                            <DataMenu authData={authData} />
                            <LocaleMenu />
                            <ProfileMenu authData={authData}/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )


}