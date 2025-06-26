import { slugify } from "@/utils/slug";
import fs from "fs";
import path from "path";
import { IMetadata, IPost } from "../types";

// slug 중복 방지를 위해 동일한 slug 뒤에 id를 붙인다
export function getSlug(text: string, slugifyMap: Record<string, number>) {
  const rawSlug = slugify(text);
  if (slugifyMap[rawSlug] == undefined) slugifyMap[rawSlug] = 0;
  const filnalSlug = `${rawSlug}${
    slugifyMap[rawSlug] == 0 ? "" : `-${slugifyMap[rawSlug]}`
  }`;
  slugifyMap[rawSlug] += 1;
  return filnalSlug;
}

function parseFrontmatter(fileContent: string): IPost {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<IMetadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    const metaDataKey = key.trim() as keyof IMetadata;
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (metaDataKey === "tags") metadata[metaDataKey] = value.split(", ");
    else metadata[metaDataKey] = value;
  });

  // TOC 추출
  const slugifyMap: Record<string, number> = {};

  const headingRegex = /^#{1,4} (.+)*/gm;
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  const matches = withoutCode.match(headingRegex) ?? [];

  const toc: Array<[number, string, string]> = [];
  matches.forEach((match) => {
    const [level, ...text] = match.split(" ");
    const joinedText = text.join(" ");
    const filnalSlug = getSlug(joinedText, slugifyMap);
    toc.push([level.length, joinedText, filnalSlug]);
  });
  return {
    metadata: metadata as IMetadata,
    toc,
    content,
  };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir): IPost[] {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, toc, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
      toc,
      content,
    };
  });
}

export function getBlogPosts() {
  return getMDXData(path.join(process.cwd(), "posts"));
}

export function formatDate(date: string, includeRelative = false) {
  let currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  let targetDate = new Date(date);

  let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  let daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}년 전`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}달 전`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}일 전`;
  } else {
    formattedDate = "오늘";
  }

  let fullDate = targetDate.toLocaleString("ko-kr", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate}(${formattedDate})`;
}
