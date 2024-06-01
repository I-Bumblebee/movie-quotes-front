import type { TranslatedField } from "@/types/index";

export interface Quote {
  id: number;
  quote: string | TranslatedField;
  image: string;
  likes_count: number;
  comments_count: number;
}

interface BasicUser {
  name: string;
  image: string;
}

export interface Comment {
  comment: string;
  user: BasicUser;
}

export interface DetailedQuote extends Quote {
  comments: Comment[];
  user: BasicUser;
  movie: {
    title: string;
    release_year: number;
  };
  liked: boolean;
}
