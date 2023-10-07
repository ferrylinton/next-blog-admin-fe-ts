import CodeIcon from '@/icons/CodeIcon';
import clsx from 'clsx';
import { Righteous, Satisfy } from 'next/font/google';

const greatVibes = Satisfy({
    weight: '400',
    subsets: ['latin']
});

const righteous = Righteous({
    weight: "400",
    subsets: ['latin']
});

export default function Banner() {
    return (
        <div className='w-full flex justify-center items-center mt-[50px] bg-stone-100 border-b border-stone-200'>
            <div className='w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl h-[130px] md:h-[170px] px-5 md:px-8 flex items-center justify-between gap-2'>
                <div className='w-full flex flex-col justify-center text-center sm:text-start items-center gap-1'>
                    <div className={clsx(righteous.className, 'w-full text-4xl sm:text-4xl md:text-5xl', 'bg-gradient-to-b from-lime-400 to-lime-800 bg-clip-text text-transparent', 'drop-shadow-[0_1px_1px_rgba(0,0,0,1)]')}>Simple Code Sample</div>
                    <div className={clsx(greatVibes.className, 'w-full text-xl text-lime-800')}>Contoh2 sederhana kode pemrograman, css, html</div>
                </div>
                <div className='hidden sm:inline-block bg-lime-600 -rotate-3 border border-lime-700'>
                    <CodeIcon className='w-[90px] h-[90px] md:w-[120px] md:h-[120px] p-1 bg-white text-lime-800 border border-lime-800 rotate-12' />
                </div>

            </div>
        </div>
    )
}