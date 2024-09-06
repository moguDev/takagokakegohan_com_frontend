"use client";

import { axiosInstance } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

export const useEditRecipe = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const create = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/recipes", {
        recipe: {
          cooking_time: 30,
          status: "draft",
          ingredients: {
            0: { name: "生卵", amount: "1個" },
            1: { name: "白ごはん", amount: "茶碗1杯" },
          },
          steps: {
            0: {
              step_number: "1",
              instruction: "適当な器に生卵を割り入れ、よくかき混ぜます。",
            },
          },
        },
      });
      console.log(res);
      router.push(`/recipes/${res.data.id}/edit`);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const update = useCallback(
    async (
      id: number,
      title: string,
      body: string,
      cookingTime: number,
      image: File | null
    ) => {
      setLoading(true);
      try {
        await axiosInstance.put(`/recipes/${id}`, {
          recipe: {
            title: title,
            body: body,
            cooking_time: cookingTime,
            image: image,
            status: "draft",
          },
        });
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { create, update, loading, error };
};
