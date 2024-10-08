import axios from "@/plugins/axios";

const updateUser = (
  image?: File,
  name?: string,
  password?: string,
  passwordConfirmation?: string,
) => {
  return axios.post(
    "/user?_method=PATCH",
    {
      name,
      password,
      password_confirmation: passwordConfirmation,
      image,
    },
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );
};

export { updateUser };
