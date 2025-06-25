"use client";

import { useState, useEffect } from "react";
import { slugify } from "@/utils/slug";

export default function TableOfContents({
  toc,
}: {
  toc: Array<[number, string]>;
}) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headingEls = toc
      .map(([, text]) => document.getElementById(slugify(text)))
      .filter((el): el is HTMLElement => el !== null);

    if (!headingEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        // when the heading crosses 20% from the top
        rootMargin: "-20% 0px -80% 0px",
        threshold: 0,
      }
    );

    headingEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

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
    <aside className="hidden 2xl:block sticky w-4xl top-24">
      <div className="absolute left-full ml-10 text-sm z-20 w-1/4 overflow-hidden text-neutral-400">
        <h2 className=" mb-2 text-neutral-600 dark:text-neutral-300 font-semibold">
          Table Of Contents
        </h2>
        <ul className="truncate flex flex-col gap-1">
          {toc.map(([level, slug], index) => (
            <li
              className={`${getPadding(
                level
              )} hover:text-neutral-600 dark:hover:text-neutral-300 text-neutral-400 dark:text-neutral-500 hover:font-medium hover:cursor-pointer`}
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
  );
}
