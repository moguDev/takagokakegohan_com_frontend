"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { useCallback, useState } from "react";

export interface Recipe {
  id: number;
  user_id: number;
  title: string;
  body: string;
  cooking_time: number;
  image: string;
}

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchRecipes = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/recipes");
      setRecipes(res.data);
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  }, []);

  return { recipes, fetchRecipes };
};
