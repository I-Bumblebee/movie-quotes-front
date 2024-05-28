export type User = {
  id: number;
  name: string;
  email: string;
  image: string;
  oauth: boolean;
};

export interface StoreMovieData {
  title: {
    en: string;
    ka: string;
  };
  description: {
    en: string;
    ka: string;
  };
  director_name: {
    en: string;
    ka: string;
  };
  release_year: number;
  poster: File;
  genres: string[];
}

interface Meta {
  last_page: number;
}

type MovieIndexCardContent = {
  id: number;
  title: string;
  release_year: number;
  quotes_count: number;
  poster: string;
};

export interface MovieIndexResponse {
  data: MovieIndexCardContent[];
  meta: Meta;
}
