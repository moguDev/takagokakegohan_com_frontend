"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useRecipeDetails = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/recipes/${id}`);
      setRecipe(res.data);
    } catch (error) {
      throw Error("レシピの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [setRecipe]);

  useEffect(() => {
    fetch();
  }, []);

  return { recipe, loading };
};
