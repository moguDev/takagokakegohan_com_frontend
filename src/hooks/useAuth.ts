import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";
import { AxiosError } from "axios";

type TypeAuth = {
  isAuthenticated: boolean;
  user_id: number;
  name: string;
  nickname: string;
  avatar: { url: string | null };
  rank?: string;
};

const authState = atom<TypeAuth>({
  key: "authState",
  default: {
    isAuthenticated: false,
    user_id: -1,
    name: "",
    nickname: "",
    avatar: { url: null },
    rank: "かけだし",
  },
});

const loadingState = atom<boolean>({
  key: "loadingState",
  default: false,
});

const setCookies = (accessToken: string, client: string, uid: string) => {
  Cookies.set("access-token", accessToken, {
    secure: true,
    sameSite: "strict",
  });
  Cookies.set("client", client, { secure: true, sameSite: "strict" });
  Cookies.set("uid", uid, { secure: true, sameSite: "strict" });
};

export const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [errors, setErrors] = useState<string[]>([]);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/validate_token");
      setAuth({
        isAuthenticated: true,
        user_id: res.data.data.id,
        name: res.data.data.name,
        nickname: res.data.data.nickname,
        avatar: {
          url: res.data.data.avatar.url,
        },
        rank: res.data.data.rank,
      });
    } catch (error) {
      console.error("認証情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [setAuth, setLoading]);

  const signup = useCallback(
    async ({
      email,
      password,
      passwordConfirmation,
      name,
      nickname,
    }: {
      email: string;
      password: string;
      passwordConfirmation: string;
      name: string;
      nickname: string;
    }) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/auth", {
          email,
          password,
          password_confirmation: passwordConfirmation,
          name,
          nickname,
        });
        const { "access-token": accessToken, client, uid } = res.headers;
        if (accessToken && client && uid) {
          setCookies(accessToken, client, uid);
          setAuth({
            isAuthenticated: true,
            user_id: res.data.data.id,
            name: res.data.data.name,
            nickname: res.data.data.nickname,
            avatar: {
              url: res.data.data.avatar.url,
            },
          });
        }
      } catch (error) {
        error instanceof AxiosError
          ? setErrors(error.response?.data.errors.full_messages)
          : setErrors(["アカウントの作成に失敗しました。"]);
        throw new Error("アカウントの作成に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading]
  );

  const login = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/auth/sign_in", {
          email,
          password,
        });
        const { "access-token": accessToken, client, uid } = res.headers;
        if (accessToken && client && uid) {
          setCookies(accessToken, client, uid);
          setAuth({
            isAuthenticated: true,
            user_id: res.data.data.id,
            name: res.data.data.name,
            nickname: res.data.data.nickname,
            avatar: {
              url: res.data.data.avatar.url,
            },
          });
        }
        setAuth((prev) => ({ ...prev, isAuthenticated: true }));
      } catch (error) {
        setErrors(["ログインに失敗しました。"]);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axiosInstance.delete("/auth/sign_out");
      Cookies.remove("access-token");
      Cookies.remove("client");
      Cookies.remove("uid");
      setAuth({
        isAuthenticated: false,
        user_id: -1,
        name: "",
        nickname: "",
        avatar: { url: null },
      });
    } catch (error) {
      throw new Error("ログアウトに失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [setAuth, setLoading]);

  const updateProfile = useCallback(
    async (
      avatar: File | null,
      name: string,
      nickname: string,
      introduction: string
    ) => {
      setLoading(true);
      try {
        const res = await axiosInstance.put(
          "/auth",
          {
            avatar,
            name,
            nickname,
            introduction,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        const { "access-token": accessToken, client, uid } = res.headers;
        if (accessToken && client && uid) {
          setCookies(accessToken, client, uid);
          setAuth({
            isAuthenticated: true,
            user_id: res.data.data.id,
            name: res.data.data.name,
            nickname: res.data.data.nickname,
            avatar: {
              url: res.data.data.avatar.url,
            },
          });
        }
      } catch (error) {
        throw new Error("プロフィールの更新に失敗しました");
      } finally {
        setLoading(false);
      }
    },
    [setAuth, setLoading]
  );

  return {
    auth,
    loading,
    errors,
    checkAuth,
    signup,
    login,
    logout,
    updateProfile,
  };
};
