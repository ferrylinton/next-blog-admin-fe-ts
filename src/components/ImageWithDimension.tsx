'use client'

import { Image as ImageType } from '@/types/image-type';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Dimensions, getImageSize } from 'react-image-size';

type Props = {
    image: ImageType
}

function ImageWithDimension({ image }: Props) {

    const [dimensions, setDimensions] = useState<Dimensions>({ width: 0, height: 0 })

    useEffect(() => {
        async function getDimension() {
            const dimensions = await getImageSize(`${process.env.NEXT_PUBLIC_API_HOST}${image.urls[0]}`);
            setDimensions(dimensions)
        }
        getDimension().catch(error => console.log(error));

    }, []);

    return (
        <Image src={process.env.NEXT_PUBLIC_API_HOST + image.urls[0]}
            alt={process.env.NEXT_PUBLIC_API_HOST + image.urls[0]}
            priority={true}
            width={dimensions.width}
            height={dimensions.height}
            className='min-w-[50px] min-h-[50px] object-cover'
        />
    )
}

export default ImageWithDimension