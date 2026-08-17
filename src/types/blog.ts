export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type BlogPost = {
  id: string;
  title: string;
  body: string;
  description?: string;
  eyecatch?: MicroCMSImage;
  publishedAt: string;
  updatedAt: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
