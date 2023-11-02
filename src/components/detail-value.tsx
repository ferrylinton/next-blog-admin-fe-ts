import CheckIcon from '@/icons/CheckIcon'
import CloseIcon from '@/icons/CloseIcon'
import { formatToTimestamp } from '@/libs/date-util'
import React from 'react'

type Prop = {
    val: string | number | boolean | string[] | undefined
}

export default function DetailValue({ val }: Prop) {

    const getIcon = (val: boolean) => {
        if (val) {
            return <CheckIcon className='w-[18px] h-[18px] text-green-600' />
        } else {
            return <CloseIcon className='w-[24px] h-[24px] text-red-600' />
        }
    }

    if (typeof val === 'string') {
        return <span>{formatToTimestamp(val)}</span>

    } else if (typeof val === 'boolean') {
        return getIcon(val);

    } else if (val instanceof Array) {
        return <ol className="list-decimal ms-4">
            {val.map((v, index) => <li key={index}>{v}</li>)}
        </ol>

    } else {
        return <span>{val}</span>
    }
}
