import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/blog/utils";
import { baseUrl } from "app/sitemap";
import { slugify } from "@/utils/slug";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }) {
  let post = getBlogPosts().find((post) => post.slug === params.slug);
  if (!post) {
    return;
  }

  let {
    title,
    publishedAt: publishedTime,
    summary: description,
    image,
  } = post.metadata;
  let ogImage = image
    ? image
    : `${baseUrl}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime,
      url: `${baseUrl}/blog/${post.slug}`,
      images: [
        {
          url: ogImage,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Blog({ params }) {
  const post = getBlogPosts().find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  const getPadding = (level: number): string | undefined => {
    return level === 1
      ? "pl-0"
      : level === 2
      ? "pl-2"
      : level === 3
      ? "pl-4"
      : level === 4
      ? "pl-6"
      : "pl-0";
  };

  return (
    <section className="max-w-4xl m-auto relative px-4 xl:px-0">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `/images/${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: "My Portfolio",
            },
          }),
        }}
      />
      {post.toc && (
        <aside className="hidden 2xl:block sticky w-4xl top-24 bg-amber-500">
          <div className="absolute left-full ml-10 text-sm z-20 w-1/4 overflow-hidden text-neutral-400">
            <h1 className=" mb-2 text-neutral-500 font-semibold">
              Table Of Contents
            </h1>
            <ul className="truncate flex flex-col gap-1">
              {post.toc.map(([level, slug], index) => (
                <li
                  className={`${getPadding(
                    level
                  )} hover:text-neutral-600 hover:font-medium hover:cursor-pointer`}
                  key={index}
                >
                  <a href={`#${slugify(slug)}`} className="anchor">
                    {slug}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
      {post.metadata.tags && (
        <ul className="flex flex-wrap gap-1.5 mb-5">
          {post.metadata.tags?.map((tag) => (
            <li
              key={tag}
              className="rounded-md bg-neutral-100/20 dark:bg-neutral-600/20 px-2 py-1 border border-neutral-200 dark:border-neutral-500 font-medium text-neutral-500 dark:text-neutral-300 text-sm tabular-nums"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
      <h1 className="title font-bold text-4xl tracking-tighter mb-5">
        {post.metadata.title}
      </h1>

      <div className="flex justify-between items-center mt-3 mb-10 text-sm">
        <p className="text-base text-neutral-500 dark:text-neutral-400">
          {formatDate(post.metadata.publishedAt)}
        </p>
      </div>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
