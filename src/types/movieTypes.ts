import type { Genre, TranslatedField } from "@/types";

export interface MovieBase {
  id: number;
  title: string;
  release_year: number;
  poster: string;
  genres: Genre[];
}

export interface DetailedMovie extends MovieBase {
  description: string;
  director: string;
}

export interface DetailedMovieWithTranslations {
  id: number;
  release_year: number;
  poster: string;
  genres: Genre[];
  title: TranslatedField;
  description: TranslatedField;
  director: TranslatedField;
}

export interface MovieIndexContent extends MovieBase {
  quotes_count: number;
}

export interface StoreMovieRequestData {
  title: TranslatedField;
  description: TranslatedField;
  director_name: TranslatedField;
  release_year: number;
  poster: File;
  genres: string[];
}
