import React from 'react'

type Props = {
    message?: string
}

export default function ValidationError({ message }: Props) {
    if (message) {
        return <div className="form-error-label"> {message} </div>
    } else {
        return null;
    }
}