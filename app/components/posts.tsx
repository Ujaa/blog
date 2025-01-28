import Link from "next/link";
import { baseUrl } from "app/sitemap";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  const allBlogs = getBlogPosts();

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {allBlogs
        .sort((a, b) =>
          new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
            ? -1
            : 1
        )
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            {console.log(post.metadata.image)}
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
              <h2 className="font-bold text-lg text-neutral-900 mb-2 leading-6 line-clamp-2 tracking-tight">
                {post.metadata.title}
              </h2>
              <p className="font-medium text-sm text-neutral-700 line-clamp-2 mb-2 tracking-tight">
                {post.metadata.summary}
              </p>
              <p className="font-medium text-neutral-400 text-xs tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </li>
          </Link>
        ))}
    </ul>
  );
}
