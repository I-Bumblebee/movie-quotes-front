import axios from "@/plugins/axios/index.js";

const sendResetLink = async (email: string) => {
  return await axios.post("/forgot-password", {
    email,
  });
};

const resetPassword = async (
  email: string,
  password: string,
  passwordConfirmation: string,
  token: string,
) => {
  return await axios.post("/reset-password", {
    email,
    password,
    password_confirmation: passwordConfirmation,
    token,
  });
};

export { sendResetLink, resetPassword };
