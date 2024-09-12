"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Ingredient, Recipe, Step } from "@/types";
import camelcaseKeys from "camelcase-keys";
import { useCallback, useEffect, useState } from "react";

export const useRecipeDetails = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/recipes/${id}`);
      console.log(camelcaseKeys(res.data, { deep: true }));
      setRecipe(camelcaseKeys(res.data, { deep: true }));
    } catch (error) {
      throw Error("レシピの取得に失敗しました。");
    } finally {
      setLoading(false);
    }
  }, [id]);

  const update = useCallback(
    async (recipe: Recipe) => {
      setLoading(true);
      try {
        const res = await axiosInstance.put(
          `/recipes/${id}`,
          {
            recipe: recipe,
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setRecipe(camelcaseKeys(res.data, { deep: true }));
      } catch (error) {
        throw Error("レシピの更新に失敗しました。");
      } finally {
        setLoading(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { recipe, loading, fetch, update };
};
