import BreadcrumbIcon from '@/icons/BredcrumbIcon'
import HomeIcon from '@/icons/HomeIcon'
import { BreadCrumbItem } from '@/types/breadcrumb-type'
import Link from 'next/link'
import React from 'react'

type Props = {
    items: BreadCrumbItem[]
}

export default function BreadCrumb({ items }: Props) {
    return (
        <div className='w-full bg-stone-50 border-b border-stone-100 flex justify-center items-center text-stone-500'>
            <div className="w-full md:max-w-3xl lg:max-w-4xl xl:max-w-5xl flex justify-start  items-center h-[40px] px-2 flex-wrap">
                <Link href="/" className="h-full flex items-center px-2">
                    <HomeIcon className='w-[20px] h-[20px]' />
                </Link>
                {
                    items.map(item => {
                        const bc = (item.url) ?
                            <Link href={item.url} className="h-full flex items-center px-2 uppercase text-sm">
                                <span>{item.label}</span>
                            </Link> :
                            <div className='h-full flex items-center px-2'>
                                <span className='leading-none'>{item.label}</span>
                            </div>

                        return <div key={item.label} className='flex justify-center items-center uppercase text-sm'>
                            <div className='h-full flex items-center px-1'>
                                <BreadcrumbIcon className='w-[10px] h-[10px]' />
                            </div>
                            {bc}
                        </div>
                    })
                }

            </div>
        </div>
    )
}