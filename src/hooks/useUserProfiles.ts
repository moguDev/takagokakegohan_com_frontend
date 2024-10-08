import { axiosInstance } from "@/lib/axiosInstance";
import { Recipe, UserProfiles } from "@/types";
import { AxiosError } from "axios";
import { useState, useEffect, useCallback } from "react";
import camelcaseKeys from "camelcase-keys";

export const useUserProfiles = (name: string) => {
  const [userProfiles, setUserDetails] = useState<UserProfiles>({
    name: "",
    nickname: "",
    avatar: { url: null },
    rank: "",
    introduction: "",
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/users/${name}`);
      setUserDetails({
        ...res.data,
        avatar: {
          url: res.data.avatar.url ? `${res.data.avatar.url}` : null,
        },
      });
    } catch (err) {
      if ((err as AxiosError).response?.status === 404) {
        setError("404");
      } else {
        setError("ユーザ情報の取得に失敗しました。");
      }
    } finally {
      setLoading(false);
    }
  }, [setUserDetails]);

  const fetchRecipes = useCallback(async () => {
    try {
      const res = await axiosInstance.get(`/users/${name}/recipes`);
      setRecipes(camelcaseKeys(res.data, { deep: true }));
    } catch (error) {
      new Error("レシピの取得に失敗しました。");
    }
  }, []);

  const reload = useCallback(() => {
    fetchProfile();
  }, [setUserDetails]);

  useEffect(() => {
    fetchProfile();
    fetchRecipes();
  }, [name]);

  return { userProfiles, recipes, reload, loading, error };
};
