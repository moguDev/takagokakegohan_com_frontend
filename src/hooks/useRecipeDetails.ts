"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Ingredient, Recipe, Step } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useRecipeDetails = (id: number) => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const adaptIngredients = (
    ingredients: { ingredient_name: string; amount: string }[]
  ): Ingredient[] => {
    return ingredients.map((ingredient) => ({
      name: ingredient.ingredient_name,
      amount: ingredient.amount,
    }));
  };

  const adaptSteps = (
    steps: { step_number: number; instruction: string; image: string | null }[]
  ): Step[] => {
    return steps.map((step) => ({
      stemNumber: step.step_number,
      instruction: step.instruction,
    }));
  };

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/recipes/${id}`);
      setRecipe({
        ...res.data,
        ingredients: adaptIngredients(res.data.recipe_ingredients),
        steps: adaptSteps(res.data.steps),
        bookmarkCount: res.data.bookmark_count,
      });
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
        setRecipe({
          ...res.data,
          ingredients: adaptIngredients(res.data.recipe_ingredients),
          steps: adaptSteps(res.data.steps),
        });
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
