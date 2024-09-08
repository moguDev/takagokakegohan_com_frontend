import axios from "axios";
import Cookies from "js-cookie";
import _ from "lodash";

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("access-token");
    const client = Cookies.get("client");
    const uid = Cookies.get("uid");

    if (accessToken && client && uid) {
      config.headers["access-token"] = accessToken;
      config.headers["client"] = client;
      config.headers["uid"] = uid;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const checkStatus: () => Promise<void> = async () => {
  try {
    const res = await axiosInstance.get("status");
    console.log(res);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};
