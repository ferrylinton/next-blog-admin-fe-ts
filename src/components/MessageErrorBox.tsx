import { MessageError } from '@/types/response-type';
import React from 'react'

type Props = {
    messageError: MessageError | null
}

export default function MessageErrorBox({ messageError }: Props) {
    if (messageError) {
        return <div className="w-full border border-red-300 bg-red-50 px-3 py-2 mb-8 text-sm flex flex-col text-red-500"> {messageError.message} </div>
    } else {
        return null;
    }
}