export type MicroCMSImage = {
  url: string;
  height: number;
  width: number;
};

export type Category = {
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  title: string;
  body: string;
  description?: string;
  eyecatch?: MicroCMSImage;
  categories?: Category[];
  publishedAt: string;
  updatedAt: string;
};

export type MicroCMSListResponse<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};
