import { BlogPosts } from "app/components/posts";
import Title from "../components/Title";

export const metadata = {
  title: "Blog",
  description: "Read my blog.",
};

export default function Page() {
  return (
    <section className="wrapper">
      <Title>Blog</Title>
      <BlogPosts />
    </section>
  );
}
