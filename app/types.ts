export interface IMetadata {
  title: string;
  publishedAt: string;
  summary: string;
  image?: string;
  tags: string[];
}

export interface IPost {
  metadata: IMetadata;
  slug?: string;
  content: string;
  toc?: Array<[number, string]>;
}
