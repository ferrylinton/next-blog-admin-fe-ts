import { Post } from "@/types/post-type";
import { format } from 'date-fns'


const isDate = (str: any) => {
    const regex = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)((-(\d{2}):(\d{2})|Z)?)$/;
    return str.match(regex);
}

export const formatDate = (input: any) => {
    if (isDate(input)) {
        return format(new Date(input), 'MM/dd/yyyy HH:mm SSS');
    }

    return input;
}