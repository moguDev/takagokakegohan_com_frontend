"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async (filter?: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        filter ? `/recipes?filter=${filter}` : "/recipes"
      );
      setRecipes(res.data);
    } catch (error) {
      throw new Error("レシピの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetch("new");
  }, [fetch]);

  return { recipes, loading, fetch };
};
