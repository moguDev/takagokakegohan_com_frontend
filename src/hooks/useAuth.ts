import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback } from "react";
import { atom, useRecoilState } from "recoil";
import Cookies from "js-cookie";

type TypeAuth = {
  isAuthenticated: boolean;
  user_id: number;
  name: string;
  image: File | null;
};

const authState = atom<TypeAuth>({
  key: "authState",
  default: {
    isAuthenticated: false,
    user_id: -1,
    name: "",
    image: null,
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

const useAuth = () => {
  const [auth, setAuth] = useRecoilState(authState);
  const [loading, setLoading] = useRecoilState(loadingState);

  const checkAuth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/auth/validate_token");
      setAuth({
        isAuthenticated: true,
        user_id: res.data.data.id,
        name: res.data.data.name,
        image: res.data.data.image,
      });
    } catch (error) {
      console.error("認証情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [setAuth]);

  const signup = useCallback(
    async (
      email: string,
      password: string,
      passwordConfirmation: string,
      name: string
    ) => {
      setLoading(true);
      try {
        const res = await axiosInstance.post("/auth", {
          email,
          password,
          password_confirmation: passwordConfirmation,
          name,
        });
        const { "access-token": accessToken, client, uid } = res.headers;
        if (accessToken && client && uid) {
          setCookies(accessToken, client, uid);
          setAuth({
            isAuthenticated: true,
            user_id: res.data.id,
            name: res.data.name,
            image: res.data.image,
          });
        }
      } catch (error) {
        throw new Error("アカウントの作成に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [setAuth]
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
            image: res.data.data.image,
          });
        }
        setAuth((prev) => ({ ...prev, isAuthenticated: true }));
      } catch (error) {
        throw new Error("ログインに失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [setAuth]
  );

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await axiosInstance.delete("/auth/sign_out");
      Cookies.remove("access-token");
      Cookies.remove("client");
      Cookies.remove("uid");
      setAuth({ isAuthenticated: false, user_id: -1, name: "", image: null });
    } catch (error) {
      throw new Error("ログアウトに失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [setAuth]);

  return {
    auth,
    loading,
    checkAuth,
    signup,
    login,
    logout,
  };
};

export default useAuth;
