import { Post } from '@/types/post-type';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PostMetaInfo from './PostMetaInfo';


type Props = {
    post: Post
}

export default function PostItem({ post }: Props) {

    const router = useRouter();

    const { i18n } = useTranslation('common');

    const handleSelectPost = (url: string) => {
        router.push(url, undefined, { locale: i18n.language });
    }

    return (
        <article className="w-full mb-2 bg-white flex flex-col justify-start p-2 border border-stone-200 transition-colors hover:text-lime-900 hover:bg-gradient-to-b from-lime-50 via-lime-100 to-lime-200">
            <div className='flex flex-col p-2'>
                <div className='group flex flex-col'>
                    <Link href={`/post/${post.slug}`} className='mb-3 text-lg md:text-xl font-semibold cursor-pointer'>
                        {post.title[i18n.language as keyof typeof post.description]}{' '}
                        <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                            -&gt;
                        </span>
                    </Link>
                    <p className='cursor-pointer' onClick={() => handleSelectPost(`/post/${post.slug}`)}>{post.description[i18n.language as keyof typeof post.description]}</p>
                    <div className='mt-3'>
                        <PostMetaInfo post={post} />
                    </div>
                </div>
            </div>
        </article>
    )
}
