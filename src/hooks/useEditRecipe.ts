"use client";

import { toastState } from "@/components/Toast";
import { axiosInstance } from "@/lib/axiosInstance";
import { Ingredient, RecipeStatus, Step } from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";

export interface RecipeFormData {
  title: string;
  body: string;
  cooking_time: number;
  image: FileList | null;
  ingredients: Ingredient[];
  steps: Step[];
}

export const useEditRecipe = () => {
  const setMessage = useSetRecoilState(toastState);
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
        setMessage("レシピのタイトルを入力してください。");
        return;
      }
      try {
        const res = await axiosInstance.put(
          `/recipes/${id}`,
          {
            recipe: {
              ...data,
              image: data.image ? data.image[0] : null,
              status: status,
            },
          },
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        if (status === "published") {
          router.replace(`/recipes/${id}`);
          setMessage("レシピを公開しました！");
        } else {
          setMessage("下書きを保存しました。");
        }
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  return { create, update, loading, error };
};
