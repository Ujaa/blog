import { ImageResponse } from "next/og";

export function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title") || "Next.js Portfolio Starter";

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-neutral-900">
        <div tw="flex flex-col w-full py-12 px-6">
          <h2 tw="flex flex-col text-5xl font-bold tracking-tight text-left text-white">
            {title}
          </h2>
          <p tw="text-white text-3xl">written by Ujaa</p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 800,
    }
  );
}
