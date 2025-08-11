export type SiteConfig = {
  name: string;
  author: string;
  description: string;
  keywords: Array<string>;
  url: {
    base: string;
    author: string;
  };
  links: {};
  ogImage: string;
};

export type ConfigType = {
  API_URL: string;
};

export interface PreviewFile {
  type: string;
  name: string;
  size: number;
  preview: string;
}

export interface ApiResponse<T> {
  code: number;
  success: boolean;
  message: string;
  data: T;
  result?: number;
  total?: number;
}

export type StatusOptions = {
  label: string;
  status: "active" | "inactive" | "disabled";
  className?: string;
  isHideBorder?: boolean;
};

export type Params = {
  params: {
    lang: "en" | "rus" | "hy";
  };
};

export type CategoryType = "buy" | "rent" | "daily rent";
export type ChooseType = "house" | "apartment" | "commercial" | "land";
