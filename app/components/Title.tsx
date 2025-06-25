import { PropsWithChildren } from "react";

export default function Tag({ children }: PropsWithChildren) {
  return (
    <h1 className="dark:text-neutral-300 text-neutral-800 text-5xl mb-8 tracking-tighter;">
      {children}
    </h1>
  );
}
