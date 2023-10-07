import { Post } from "@/types/post-type";
import { format } from 'date-fns'

export const getPostDate = ({ createdAt, updatedAt }: Post) => {
    if (updatedAt && updatedAt > createdAt) {
        return format(new Date(updatedAt), 'MM/dd/yyyy');
    } else {
        return format(new Date(createdAt), 'MM/dd/yyyy');
    }
}