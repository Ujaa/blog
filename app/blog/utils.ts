import fs from "fs";
import path from "path";
import { Metadata, Post } from "../types";

function parseFrontmatter(fileContent: string): Post {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(fileContent);
  const frontMatterBlock = match![1];
  const content = fileContent.replace(frontmatterRegex, "").trim();
  const frontMatterLines = frontMatterBlock.trim().split("\n");
  const metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    const metaDataKey = key.trim() as keyof Metadata;
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (metaDataKey === "tags") metadata[metaDataKey] = value.split(", ");
    else metadata[metaDataKey] = value;
  });

  const headingRegex = /^#{1,4} (.+)*/gm;
  const matches = content.match(headingRegex) ?? [];
  const toc: Array<[number, string]> = [];
  matches.forEach((match) => {
    const [level, ...text] = match.split(" ");
    toc.push([level.length, text.join(" ")]);
  });

  return {
    metadata: metadata as Metadata,
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

function getMDXData(dir): Post[] {
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
