"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";
import camelcaseKeys from "camelcase-keys";

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetch = useCallback(async (filter?: string) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(
        filter ? `/recipes?filter=${filter}` : "/recipes"
      );
      setRecipes(camelcaseKeys(res.data, { deep: true }));
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
