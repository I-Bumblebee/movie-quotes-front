import axios from "@/plugins/axios";
import type { StoreMovieRequestData } from "@/types/movieTypes";

const getMovies = (page: number, keyword: string) => {
  return axios.get(`/movies?page=${page}&filter[title]=${keyword}`);
};

const getMovie = (id: string) => {
  return axios.get(`/movies/${id}`);
};

const getMovieWithTranslations = (id: string) => {
  return axios.get(`/movies/${id}`, {
    headers: {
      "With-Translations": "true",
    },
  });
};

const storeMovie = (data: StoreMovieRequestData) => {
  return axios.post("/movies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const updateMovie = (id: string, data: StoreMovieRequestData) => {
  return axios.post(`/movies/${id}?_method=PUT`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

const deleteMovie = (id: string) => {
  return axios.post(`/movies/${id}?_method=DELETE`);
};

const getMovieQuotes = (id: string) => {
  return axios.get(`/movies/${id}/quotes`);
};

export {
  getMovies,
  getMovie,
  storeMovie,
  getMovieWithTranslations,
  updateMovie,
  deleteMovie,
  getMovieQuotes,
};
