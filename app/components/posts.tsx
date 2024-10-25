import Link from "next/link";
import { formatDate, getBlogPosts } from "app/blog/utils";

export function BlogPosts() {
  let allBlogs = getBlogPosts();

  return (
    <div>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-4"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col items-center md:flex-row space-x-0 md:space-x-2">
              <p className="text-slate-600 dark:text-slate-400 text-sm w-[140px] tabular-nums">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
              <p className="flex flex-wrap gap-x-2 text-xl font-medium text-neutral-900 dark:text-neutral-100 tracking-tight">
                <span>{post.metadata.emoji}</span>
                <span>{post.metadata.title}</span>
              </p>
            </div>
          </Link>
        ))}
    </div>
  );
}
