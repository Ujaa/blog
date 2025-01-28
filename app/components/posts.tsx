import { getBlogPosts } from "app/blog/utils";
import Post from "./post";

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
        .map((post) => Post(post))}
    </ul>
  );
}
