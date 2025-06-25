"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ToggleDarkModeBtn from "./ToggleDarkModeBtn";

const navItems = {
  "/": {
    name: "about",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  const pathname = usePathname();

  return (
    <aside className="mb-16 px-4 xl:px-0 mx-auto py-3 w-full tracking-tight flex justify-between items-center sticky top-0 bg-white/80 dark:bg-neutral-900/20 backdrop-blur-lg border-b border-b-neutral-100 dark:border-b-neutral-700 z-40">
      <div className="xl:max-w-6xl w-full mx-auto flex justify-between items-center">
        <nav className="flex flex-row items-center fade" id="nav">
          <div className="flex flex-row gap-6">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive =
                pathname === path || pathname.startsWith(path + "/");
              return (
                <Link
                  key={path}
                  href={path}
                  className={`transition-all flex align-middle relative py-1 ${
                    isActive
                      ? "font-medium text-neutral-800 dark:text-white italic"
                      : "text-neutral-400 hover:text-neutral-600 dark:text-neutral-400 dark:hover:text-neutral-200"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </nav>
        <ToggleDarkModeBtn />
      </div>
    </aside>
  );
}
