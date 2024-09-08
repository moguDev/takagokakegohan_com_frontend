"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useBookmarkRecipes = (userId: number | string) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/users/${userId}/bookmarks`);
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { recipes, loading };
};
