import axios from "@/plugins/axios/index.js";

const verifyEmail = async (
  user: string,
  hash: string,
  expires: string,
  signature: string,
) => {
  return await axios.get(
    `/email/verify/${user}/${hash}?expires=${expires}&signature=${signature}`,
  );
};

export { verifyEmail };
