import axios from "@/plugins/axios";

const getGenres = () => {
  return axios.get("/genres");
};

export { getGenres };
