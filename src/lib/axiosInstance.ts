import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export const checkStatus: () => Promise<void> = async () => {
  try {
    const res = await axiosInstance.get("status");
    console.log(res);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
