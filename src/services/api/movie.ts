import axios from "@/plugins/axios";
import type { StoreMovieData } from "@/types";

const getMovies = (page: number, keyword: string) => {
  return axios.get(`/movies?page=${page}&filter[title]=${keyword}`);
};

const getMovie = (id: string) => {
  return axios.get(`/movies/${id}`);
};

const storeMovie = (data: StoreMovieData) => {
  return axios.post("/movies", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { getMovies, getMovie, storeMovie };
