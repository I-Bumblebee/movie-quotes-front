import axios from "@/plugins/axios";
import { validate } from "vee-validate";

const getCsrf = () => {
  return axios.get(import.meta.env.VITE_BACKEND_URL + "/sanctum/csrf-cookie");
};

const login = async (login: string, password: string, remember: boolean) => {
  const { valid: tryingLoginViaEmail } = await validate(login, "email");

  return axios.post("/login", {
    [tryingLoginViaEmail ? "email" : "name"]: login,
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
