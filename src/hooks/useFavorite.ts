"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";

export const useFavorite = (recipeId: number | string) => {
  const { auth } = useAuth();
  const setToast = useSetRecoilState(toastState);
  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkFavorited = useCallback(async () => {
    if (auth.isAuthenticated) {
      setLoading(true);
      try {
        const res = await axiosInstance.get(
          `/recipes/${recipeId}/is_user_liked`
        );
        setIsFavorited(res.data.is_liked);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  }, [recipeId]);

  const favorite = async () => {
    if (!auth.isAuthenticated) {
      setToast({ message: "ログインしてください", case: "alert" });
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.post(`/recipes/${recipeId}/like`);
      checkFavorited();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const unfavorite = async () => {
    if (!auth.isAuthenticated) {
      setToast({ message: "ログインしてください", case: "alert" });
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.delete(`/recipes/${recipeId}/like`);
      checkFavorited();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkFavorited();
  }, [recipeId, checkFavorited]);

  return {
    isFavorited,
    loading,
    checkFavorited,
    favorite,
    unfavorite,
  };
};
