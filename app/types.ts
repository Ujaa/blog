export type Metadata = {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags: string[];
};

export type Post = {
  metadata: Metadata;
  slug?: string;
  content: string;
  toc?: Array<[number, string]>;
};
