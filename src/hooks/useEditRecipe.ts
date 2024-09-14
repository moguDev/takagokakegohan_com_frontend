"use client";

import { toastState } from "@/components/Toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { Ingredient, RecipeStatus, Step } from "@/types";
import { Tulpen_One } from "next/font/google";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";

export interface RecipeFormData {
  title: string;
  body: string;
  cookingTime: number;
  image: FileList | null;
  ingredients: { name: string; amount: string }[];
  steps: Step[];
}

export const useEditRecipe = () => {
  const setToast = useSetRecoilState(toastState);
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
    async (id: number | string, data: RecipeFormData, status: RecipeStatus) => {
      if (
        status === "published" &&
        (data.title === "" || data.title === null)
      ) {
        setToast({
          message: "レシピのタイトルを入力してください",
          case: "alert",
        });
        return;
      }
      setLoading(true);
      try {
        const res = await axiosInstance.put(
          `/recipes/${id}`,
          {
            recipe: {
              ...data,
              cooking_time: data.cookingTime,
              image: data.image ? data.image[0] : null,
              status: status,
            },
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (status === "published") {
          router.replace(`/recipes/${id}`);
          setToast({ message: "レシピを公開しました！", case: "success" });
        } else {
          setToast({ message: "下書きを保存しました", case: "success" });
        }
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
