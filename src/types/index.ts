export interface User {
  id: number;
  name: string;
  email: string;
  image: string;
  oauth: boolean;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Meta {
  last_page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: Meta;
}

export interface TranslatedField {
  en: string;
  ka: string;
}
