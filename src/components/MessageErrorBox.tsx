import { MessageError } from '@/types/response-type';
import React from 'react'

type Props = {
    messageError: MessageError | null
}

export default function MessageErrorBox({ messageError }: Props) {
    if (messageError && messageError.message) {
        return <div className="w-full bg-red-700 px-4 py-3 mb-8 text-sm flex flex-col text-white capitalize"> {messageError.message} </div>
    } else {
        return null;
    }
}