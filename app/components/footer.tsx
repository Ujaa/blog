function ArrowIcon() {
  return (
    <svg
      width="8"
      height="8"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="dark:border-t-neutral-700 mt-36 border-t border-t-neutral-100 px-2 pb-6 pt-4">
      <div className="flex flex-col gap-1 md:gap-4 md:flex-row md:max-w-7xl m-auto md:justify-center">
        <ul className="text-xs flex items-center gap-2 text-neutral-500 md:flex-row dark:text-neutral-400">
          <li>
            <a
              className="flex items-center gap-1 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="/rss"
            >
              <ArrowIcon />
              <p>rss</p>
            </a>
          </li>
          <li>
            <a
              className="flex items-center gap-1 transition-all hover:text-neutral-800 dark:hover:text-neutral-100"
              rel="noopener noreferrer"
              target="_blank"
              href="https://github.com/Ujaa"
            >
              <ArrowIcon />
              <p>github</p>
            </a>
          </li>
        </ul>
        <p className="text-neutral-500 dark:text-neutral-400 text-xs">
          © {new Date().getFullYear()} YUJIN LEE. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
