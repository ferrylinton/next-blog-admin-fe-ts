import { useAppContext } from '@/providers/app-context';
import { ClientInfo } from '@/types/common-type';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import Navbar from './Navbar';

const inter = Inter({ subsets: ['latin'] });

type Props = {
    clientInfo: ClientInfo | null
} & PropsWithChildren;


export default function Layout({ children, clientInfo }: Props) {

    const authData = clientInfo ? clientInfo.authData : null;

    const { loading } = useAppContext();

    return (
        <>
            <Navbar authData={authData} />
            <div className={`w-full min-h-screen flex flex-col min-w-[350px] ${inter.className}`}>
                {children}
                <footer className="w-full flex justify-center items-center bg-[#3a3a3a] text-white px-2 py-3">
                    <div className="w-full ps:0 md:ps-8 md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex gap-4 md:gap-12 flex-row justify-start items-center">
                        <Image
                            width={32}
                            height={32}
                            unoptimized
                            priority={true}
                            alt='author.jpg'
                            className="w-32 h-32 border-2 border-gray-200 object-cover object-center rounded-full shadow-lg antialiased"
                            src="/images/author.jpg" />
                        <div className='text-left text-gray-300 my-2'>
                            <div className='text-md sm:text-lg md:text-xl uppercase text-gray-100'>Ferry L. H.</div>
                            <div className='text-sm text-[#78ba4c]'>ferrylinton@gmail.com</div>
                            <div className='text-md sm:text-lg md:text-xl uppercase text-gray-100 my-1'>Sofware Developer</div>
                            <div className='text-xs uppercase text-[#78ba4c]'>Java (Spring, Spring Boot, Spring Data JPA, Spring Security )</div>
                            <div className='text-xs uppercase text-[#78ba4c]'>Node (Express JS, NextJS)</div>
                        </div>
                    </div>
                </footer>
            </div>
            {loading && <div className="z-[55] fixed inset-x-0 top-[60px] animate-slideDownAndFade">
                <div className='mx-auto border rounded-full w-[60px] h-[60px] p-1 bg-stone-200 bg-opacity-30'>
                    <div className="animate-spin h-full w-full">
                        <div className="h-full w-full border-4 border-t-lime-600 border-b-lime-700 rounded-[50%]" />
                    </div>
                </div>
            </div>}
        </>
    )
}