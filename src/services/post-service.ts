import axios from "@/libs/axios";
import { markdownToHtml } from "@/libs/markdown";
import { Pageable } from "@/types/common-type";
import { Post } from "@/types/post-type";
import { RequestParams } from "@/types/request-params-type";



export async function fetchPosts(params?: RequestParams): Promise<Pageable<Post>> {
    return await axios.get<Pageable<Post>>(`/api/posts`, { params }).then(({ data }) => data)
};

export async function fetchPostBySlug(slug: string): Promise<Post> {
    return await axios.get<Post>(`/api/posts?slug=${slug}`).then(({ data }) => {
        data.content.en = markdownToHtml(data.content.en);
        data.content.id = markdownToHtml(data.content.id);
        return data;
    })
};

