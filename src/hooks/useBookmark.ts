"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useEffect, useState } from "react";

export const useBookmark = (recipeId: number | string) => {
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
    setLoading(true);
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
  }, [checkBookmarked]);

  return { isBookmarked, loading, checkBookmarked, bookmark, unbookmark };
};
