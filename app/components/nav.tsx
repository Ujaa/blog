import Link from "next/link";
import ToggleDarkModeBtn from "./ToggleDarkModeBtn";

const navItems = {
  "/": {
    name: "home",
  },
  "/blog": {
    name: "blog",
  },
};

export function Navbar() {
  return (
    <aside className="mb-16 px-2 xl:px-0 mx-auto py-3 w-full tracking-tight flex justify-between items-center sticky top-0 bg-white/80 dark:bg-neutral-900/20 backdrop-blur-lg border-b border-b-neutral-100 dark:border-b-neutral-700 z-40">
      <div className="md:max-w-7xl w-full mx-auto flex justify-between items-center">
        <nav className="flex flex-row items-center fade" id="nav">
          <div className="flex flex-row gap-6">
            {Object.entries(navItems).map(([path, { name }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1"
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
