"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import { Recipe } from "@/types";
import { useCallback, useEffect, useState } from "react";

export const useSearch = (query: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const fetch = useCallback(async () => {
    setLoading(true);
    try {
      console.log(`/recipes/search?q=${query}`);
      const res = await axiosInstance.get(`/recipes/search?q=${query}`);
      setRecipes(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    fetch();
  }, [query]);

  return { recipes, loading, fetch };
};
