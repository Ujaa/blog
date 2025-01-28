import fs from "fs";
import path from "path";

type Metadata = {
  emoji: string;
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags: string[];
};

function parseFrontmatter(fileContent: string) {
  let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  let match = frontmatterRegex.exec(fileContent);
  let frontMatterBlock = match![1];
  let content = fileContent.replace(frontmatterRegex, "").trim();
  let frontMatterLines = frontMatterBlock.trim().split("\n");
  let metadata: Partial<Metadata> = {};

  frontMatterLines.forEach((line) => {
    const [key, ...valueArr] = line.split(": ");
    const metaDataKey = key.trim() as keyof Metadata;
    let value = valueArr.join(": ").trim();
    value = value.replace(/^['"](.*)['"]$/, "$1");
    if (metaDataKey === "tags") metadata[metaDataKey] = value.split(", ");
    else metadata[metaDataKey] = value;
  });

  return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath) {
  let rawContent = fs.readFileSync(filePath, "utf-8");
  return parseFrontmatter(rawContent);
}

function getMDXData(dir) {
  let mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    let { metadata, content } = readMDXFile(path.join(dir, file));
    let slug = path.basename(file, path.extname(file));

    return {
      metadata,
      slug,
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
