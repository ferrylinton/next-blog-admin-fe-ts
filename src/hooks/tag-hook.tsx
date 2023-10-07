import { fetchTags } from "@/services/tag-service";
import { Tag } from "@/types/tag-type";
import { useQuery } from "@tanstack/react-query";

export const useTags = () => {
    return useQuery<Tag[], Error>(["tags"], fetchTags);
};