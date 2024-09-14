"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";

export const useBookmark = (recipeId: number | string) => {
  const { auth } = useAuth();
  const setToast = useSetRecoilState(toastState);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const checkBookmarked = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        `/recipes/${recipeId}/is_user_bookmarked`
      );
      setIsBookmarked(res.data.is_bookmarked);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [recipeId]);

  const bookmark = async () => {
    if (!auth.isAuthenticated) {
      setToast({ message: "ログインしてください", case: "alert" });
      return;
    }
    try {
      await axiosInstance.post(`/recipes/${recipeId}/bookmark`);
      checkBookmarked();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const unbookmark = async () => {
    if (!auth.isAuthenticated) {
      setToast({ message: "ログインしてください", case: "alert" });
      return;
    }
    setLoading(true);
    try {
      await axiosInstance.delete(`/recipes/${recipeId}/bookmark`);
      checkBookmarked();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkBookmarked();
  }, [recipeId, checkBookmarked]);

  return { isBookmarked, loading, checkBookmarked, bookmark, unbookmark };
};
