interface TagProps {
  text: string;
}

export default function Tag({ text }: TagProps) {
  return (
    <li className="rounded-md bg-neutral-100/20 dark:bg-neutral-600/20 px-1.5 py-0.5 border border-neutral-200 dark:border-neutral-500 font-medium text-neutral-500 dark:text-neutral-300 text-xs tabular-nums">
      {text}
    </li>
  );
}
