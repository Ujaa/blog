import Link from "next/link";
import { formatDate } from "app/blog/utils";
import { IPost } from "../types";
import Tag from "./Tag";

export default function Post(post: IPost) {
  return (
    <Link
      key={post.slug}
      className="flex flex-col space-y-1 mb-4"
      href={`/blog/${post.slug}`}
    >
      <li>
        <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 w-full aspect-3/2 mb-3 overflow-hidden">
          <img
            className=" w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
            src={
              post.metadata.image
                ? `/images/${post.metadata.image}`
                : `/og?title=${encodeURIComponent(post.metadata.title)}`
            }
            alt={`"${post.metadata.title}"의 포스트 이미지`}
          />
        </div>

        {post.metadata.tags && (
          <ul className="flex flex-wrap gap-1 mb-3">
            {post.metadata.tags?.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </ul>
        )}
        <h1 className="font-semibold text-lg text-neutral-950 dark:text-neutral-50 mb-2 leading-6 line-clamp-1 tracking-tight">
          {post.metadata.title}
        </h1>
        <p className="font-normal text-sm text-neutral-600 dark:text-neutral-400 leading-6 line-clamp-2 mb-2 tracking-tight">
          {post.metadata.summary}
        </p>
        <p className="font-normal text-neutral-500 dark:text-neutral-500 text-xs tabular-nums">
          {formatDate(post.metadata.publishedAt, false)}
        </p>
      </li>
    </Link>
  );
}
