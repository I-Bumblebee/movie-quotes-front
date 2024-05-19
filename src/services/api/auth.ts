import axios from "@/plugins/axios";

const getCsrf = () => {
  return axios.get(import.meta.env.VITE_BACKEND_URL + "/sanctum/csrf-cookie");
};

const login = (email: string, password: string, remember: boolean) => {
  return axios.post("/login", {
    email,
    password,
    remember,
  });
};

const fetchUser = () => {
  return axios.get("/user");
};

const getGoogleLoginRedirectUrl = () => {
  return axios.get("/oauth/google/redirect");
};

const handleGoogleLogin = (
  code: string,
  scope: string,
  authuser: number,
  hd: string,
  prompt: string,
) => {
  return axios.get("/oauth/google/callback", {
    params: { code, scope, authuser, hd, prompt },
  });
};

const register = (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
) => {
  return axios.post("/register", {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
  });
};

const logout = () => {
  return axios.post("/logout");
};

export {
  getCsrf,
  fetchUser,
  login,
  register,
  logout,
  getGoogleLoginRedirectUrl,
  handleGoogleLogin,
};
