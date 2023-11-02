import { Post } from "@/types/post-type";
import { format } from 'date-fns'

export const getPostDate = ({ createdAt, updatedAt }: Post) => {
    if (updatedAt && updatedAt > createdAt) {
        return format(new Date(updatedAt), 'MM/dd/yyyy');
    } else {
        return format(new Date(createdAt), 'MM/dd/yyyy');
    }
}

export const formatToDate = (str: string) => {
    return format(new Date(str), 'MM/dd/yyyy');
}

export const formatToTimestamp = (str: string | undefined) => {
    const req = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;

    if (str && str.match(req)) {
        return format(new Date(str), 'MM/dd/yyyy HH:mm SSS');
    }

    return str;
}