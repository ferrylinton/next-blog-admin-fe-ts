import axios from "@/libs/axios";
import { Tag } from "@/types/tag-type";

export const TAGS_KEY = ['tags'];

export async function fetchTags(): Promise<Array<Tag>> {
    return await axios.get<Array<Tag>>(`/api/tags`).then(({ data }) => data)
};