import axios from "@/plugins/axios";

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
  getQuoteWithTranslations,
  addComment,
  likeQuote,
  unlikeQuote,
};
