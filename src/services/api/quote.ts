import axios from "@/plugins/axios";
import type { TranslatedField } from "@/types";

const getQuotes = (
  page: number,
  movieSearchParam: string,
  quoteSearchParam: string,
) => {
  return axios.get(
    `/quotes?page=${page}&filter[movie.title]=${movieSearchParam}&filter[quote]=${quoteSearchParam}`,
  );
};

const getQuote = (id: number) => {
  return axios.get(`/quotes/${id}`);
};

const addQuote = (quote: TranslatedField, image: File, movieId: number) => {
  return axios.post(
    "/quotes",
    { quote, movie_id: movieId, image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

const editQuote = (quote: TranslatedField, id: number, image?: File) => {
  return axios.post(
    `/quotes/${id}?_method=PATCH`,
    { quote, image },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

const deleteQuote = (id: number) => {
  return axios.post(`/quotes/${id}?_method=DELETE`);
};

const addComment = (id: number, comment: string) => {
  return axios.post(`/quotes/${id}/comments`, { comment });
};

const likeQuote = (id: number) => {
  return axios.post(`/quotes/${id}/like`);
};

const unlikeQuote = (id: number) => {
  return axios.post(`/quotes/${id}/like?_method=DELETE`);
};

const getQuoteWithTranslations = (id: number) => {
  return axios.get(`/quotes/${id}`, {
    headers: {
      "With-Translations": "true",
    },
  });
};

export {
  getQuotes,
  getQuote,
  addQuote,
  editQuote,
  deleteQuote,
  getQuoteWithTranslations,
  addComment,
  likeQuote,
  unlikeQuote,
};
