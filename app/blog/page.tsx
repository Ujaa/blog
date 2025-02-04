import { BlogPosts } from "app/components/posts";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="max-w-7xl m-auto">
      <h1 className="font-semibold text-4xl mb-8 tracking-tighter">Blog</h1>
      <BlogPosts />
    </section>
  );
}
