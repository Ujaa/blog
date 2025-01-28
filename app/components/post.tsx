import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { Metadata } from "../types";

export default function Post(post: {
  metadata: Metadata;
  slug: string;
  content: string;
}) {
  return (
    <Link
      key={post.slug}
      className="flex flex-col space-y-1 mb-4"
      href={`/blog/${post.slug}`}
    >
      <li>
        <img
          className="rounded-xl w-full aspect-3/2 object-cover mb-3"
          src={
            post.metadata.image
              ? `/images/${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`
          }
          alt={`"${post.metadata.title}"의 포스트 이미지`}
        />

        {post.metadata.tags && (
          <ul className="flex flex-wrap gap-1 mb-3">
            {post.metadata.tags?.map((tag) => (
              <li
                key={tag}
                className="rounded-md bg-slate-100/20 px-1.5 py-0.5 border border-slate-200 font-medium text-slate-500 text-xs tabular-nums"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <h2 className="font-semibold text-lg text-slate-950 mb-2 leading-6 line-clamp-1 md:line-clamp-2 tracking-tight">
          {post.metadata.title}
        </h2>
        <p className="font-normal text-sm text-slate-600 line-clamp-2 mb-2 tracking-tight">
          {post.metadata.summary}
        </p>
        <p className="font-normal text-slate-500 text-xs tabular-nums">
          {formatDate(post.metadata.publishedAt, false)}
        </p>
      </li>
    </Link>
  );
}
