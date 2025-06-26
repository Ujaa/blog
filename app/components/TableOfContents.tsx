"use client";

import { useState, useEffect } from "react";

export default function TableOfContents({
  toc,
}: {
  toc: Array<[number, string, string]>;
}) {
  const [activeId, setActiveId] = useState<string>("");

  // observing 영역에 들어오지 않는 heading은 자동으로 toc에서 선택되지 않기 때문에 초기에 직접 지정
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) setActiveId(decodeURIComponent(hash.slice(1)));
    }
  }, []);

  useEffect(() => {
    const headingEls = toc
      .map(([, , slug]) => document.getElementById(slug))
      .filter((el): el is HTMLElement => el !== null);

    if (!headingEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        rootMargin: "0% 0px -90% 0px",
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
          {toc.map(([level, text, slug], index) => (
            <li
              onClick={() => setActiveId(slug)}
              key={index}
              className={`${getPadding(level)} 
    hover:text-neutral-600 dark:hover:text-neutral-300 
    hover:font-medium cursor-pointer transition-color duration-300
    ${
      activeId === slug
        ? "text-neutral-700 dark:text-neutral-200 font-medium"
        : "text-neutral-400 dark:text-neutral-500"
    }`}
            >
              <a href={`#${slug}`} className="anchor">
                {text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
