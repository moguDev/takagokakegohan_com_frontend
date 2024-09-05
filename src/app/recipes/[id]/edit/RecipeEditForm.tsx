"use client";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import defaultImage from "/public/images/default_avatar.png";
import { Ingredient, RecipeStatus, Step } from "@/types";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useEditRecipe } from "@/hooks/useEditRecipe";
import Loading from "@/app/loading";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";

interface FormData {
  title: string;
  body: string;
  cooking_time: number;
  image: FileList | null;
  ingredients: Ingredient[];
  steps: Step[];
}

export const RecipesEditForm: React.FC = () => {
  const setMessage = useSetRecoilState(toastState);
  const { id } = useParams();
  const router = useRouter();
  const { auth } = useAuth();
  const { update } = useEditRecipe();
  const { recipe, loading } = useRecipeDetails(Number(id));
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultValues: FormData = {
    title: "",
    body: "",
    cooking_time: 0,
    image: null,
    ingredients: [{ name: "生卵", amount: "1個" }],
    steps: [],
  };
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });
  const imageFile = watch("image");
  const [imageSource, setImageSource] = useState("");

  // 食材・調味料の動的フォーム
  const {
    fields: ingredientField,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });

  // 作り方の動的フォーム
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: "steps" });

  useEffect(() => {
    console.log(recipe);
    if (recipe) {
      setValue("title", recipe.title);
      setValue("body", recipe.body);
      setValue("cooking_time", recipe.cooking_time);
      setValue("ingredients", recipe.ingredients || [{ name: "", amount: "" }]);
      setValue("steps", recipe.steps || [{ instruction: "", image: null }]);
    }
  }, [recipe]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSource(fileReader.result as string);
      };
      fileReader.readAsDataURL(imageFile[0]);
    }
    imageFile && console.log(imageFile[0]);
  }, [imageFile]);

  const updateRecipe = async (recipe: FormData, status: RecipeStatus) => {
    try {
      const res = await axiosInstance.put(
        `/recipes/${id}`,
        {
          recipe: {
            ...recipe,
            image: recipe.image ? recipe.image[0] : null,
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
  };
  return recipe?.user.name === auth.name ? (
    <div className="w-full">
      <form
        method="post"
        onSubmit={handleSubmit((data: FormData) => {
          updateRecipe(data, "published");
        })}
        className="max-w-4xl mx-auto"
      >
        <section className="lg:flex p-3 mb-1 w-full">
          <button
            type="button"
            className="bg-gray-100 m-1 rounded lg:w-1/3 w-full min-h-80 flex items-center justify-center my-btn"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            {recipe?.image.url || imageSource ? (
              <Image
                src={
                  imageSource
                    ? imageSource
                    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe?.image.url}`
                }
                alt="レシピの画像"
                className="object-cover rounded"
                fill
              />
            ) : (
              <div className="text-gray-300 flex items-center">
                <span className="material-icons mr-2">add_a_photo</span>
                <p className="text-sm font-bold">レシピの画像を選択</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                onChange: () => {},
              })}
              ref={(e: HTMLInputElement) => {
                register("image").ref(e);
                fileInputRef.current = e;
              }}
              hidden
            />
          </button>
          <div className="lg:w-2/3 w-full">
            <input
              type="text"
              className="w-full bg-gray-100 text-xl font-semibold outline-none my-1 p-2 rounded-lg"
              placeholder="たまごかけごはんの名前"
              {...register("title", {
                required: "たまごかけごはんの名前を入力してください。",
                maxLength: {
                  value: 32,
                  message: "タイトルは32文字以内にしてください。",
                },
              })}
            />
            <div className="text-red-500 text-xs p-1">
              {errors.title?.message}
            </div>
            <div className="flex items-center px-2">
              <div className="rounded-full h-5 w-5 relative mr-1">
                <Image
                  src={auth.avatar.url || defaultImage}
                  alt="アイコン"
                  className="object-cover rounded-full"
                  fill
                />
              </div>
              <p className="text-xs font-semibold">{auth.nickname}</p>
            </div>
            <div>
              <input
                type="text"
                className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                placeholder="説明、メッセージ、コメントなど"
                {...register("body", {
                  maxLength: {
                    value: 128,
                    message: "128文字以内にしてください。",
                  },
                })}
              />
            </div>
          </div>
        </section>
        <div className="lg:flex">
          <section className="lg:w-1/2 w-full">
            <div className="p-5 mb-1">
              <section className="border-b border-gray-400 mb-3">
                <h2 className="text-sm text-gray-400 font-semibold pb-2 flex items-center">
                  <span className="material-icons scale-75 text-yellow-500">
                    timer
                  </span>
                  調理時間
                </h2>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="text-center bg-gray-100 rounded outline-none my-1 mr-1 p-1.5"
                    placeholder="30"
                    {...register("cooking_time", {
                      required: "調理時間を入力してください",
                      min: {
                        value: 1,
                        message: "調理時間が不正です。",
                      },
                    })}
                  />
                  秒
                </div>
                <div className="text-red-500 text-xs p-1">
                  {errors.cooking_time?.message}
                </div>
              </section>
              <section className="border-b border-gray-400">
                <h2 className="text-sm text-gray-400 font-semibold pt-3 pb-2 flex items-center">
                  <span className="material-icons scale-75 text-yellow-500">
                    egg
                  </span>
                  調味料・食材
                </h2>
                {ingredientField.map((field, index) => (
                  <div
                    key={index}
                    className="flex items-center border-b border-gray-300 border-dashed my-2"
                  >
                    <span className="font-black text-yellow-600">・</span>
                    <input
                      type="text"
                      className="w-2/3 bg-gray-50 rounded outline-none my-1 px-1 py-2"
                      placeholder="調味料・食材"
                      {...register(`ingredients.${index}.name`, {
                        required: "食材名を入力してください。",
                      })}
                    />
                    <input
                      type="text"
                      className="w-1/3 bg-gray-50 rounded outline-none my-1 ml-1 px-1 py-2"
                      placeholder="分量"
                      {...register(`ingredients.${index}.amount`, {
                        required: "分量を入力してください。",
                      })}
                    />
                    <button
                      type="button"
                      className="material-icons text-gray-400 scale-75 ml-2 select-none focus:outline-none"
                      onClick={() => removeIngredient(index)}
                      tabIndex={-1}
                    >
                      close
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="my-btn flex items-center justify-center w-full py-2 opacity-80 bg-blue-50 text-blue-400 rounded mb-2"
                  onClick={() =>
                    appendIngredient({
                      name: "",
                      amount: "",
                    })
                  }
                >
                  <span className="material-icons scale-75">add</span>
                  <span className="font-medium text-sm">
                    調味料・食材を追加
                  </span>
                </button>
              </section>
            </div>
          </section>
          <section className="lg:w-1/2 w-full lg:ml-1">
            <div className="p-5 h-max">
              <h2 className="text-sm text-gray-400 font-semibold pb-1 flex items-center">
                <span className="material-icons scale-75 text-yellow-500">
                  restaurant
                </span>
                作り方
              </h2>
              {stepFields.map((field, index) => (
                <div
                  key={index}
                  className="border-b border-gray-300 border-dashed my-2"
                >
                  <div className="flex items-center">
                    <p className="inline">{index + 1}. </p>
                    <input
                      type="text"
                      className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                      placeholder="適当な器に卵を割り入れ、よく混ぜる"
                      {...register(`steps.${index}.instruction`)}
                    />
                    <button
                      type="button"
                      className="material-icons text-gray-400 scale-75 ml-2 select-none outline-none"
                      onClick={() => removeStep(index)}
                      tabIndex={-1}
                    >
                      close
                    </button>
                  </div>
                  <input type="file" className="hidden" />
                </div>
              ))}
              <button
                type="button"
                className="my-btn flex items-center justify-center w-full py-2 opacity-80 bg-blue-50 text-blue-400 rounded mb-2"
                onClick={() => appendStep({ instruction: "", image: null })}
              >
                <span className="material-icons scale-75">add</span>
                <span className="font-medium text-sm">作り方を追加</span>
              </button>
            </div>
          </section>
        </div>
        <div
          className={`
        fixed bottom-0 bg-white bg-opacity-75 backdrop-blur-xl lg:border lg:rounded-xl border-t border-gray-200 max-w-4xl
        h-16 w-full
        lg:mb-2 p-2 flex justify-between z-10`}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="mr-1 flex items-center scale-75"
            tabIndex={-1}
          >
            <span className="material-icons">arrow_back</span>
            もどる
          </button>
          <div className="flex items-center">
            <button
              type="button"
              className="material-icons p-2 m-1 bg-red-400 text-white rounded my-btn"
              onClick={() =>
                (
                  document.getElementById("delete_modal") as HTMLDialogElement
                ).showModal()
              }
              tabIndex={-1}
            >
              delete
            </button>
            <button
              type="button"
              className="material-icons p-2 m-1 border border-gray-500 text-gray-500 rounded my-btn"
              onClick={handleSubmit((data: FormData) => {
                updateRecipe(data, "draft");
              })}
            >
              <p className="text-sm">下書き保存</p>
            </button>
            <button
              type="submit"
              className="material-icons p-2 m-1 px-5 bg-yellow-600 text-white rounded my-btn"
            >
              <p className="text-sm font-bold">公開する</p>
            </button>
          </div>
        </div>
      </form>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-white rounded">
          <h3 className="font-bold text-lg">レシピを削除しますか？</h3>
          <p className="flex items-center py-4 text-red-500 text-sm font-semibold">
            ※削除したレシピは元に戻すことはできません。
          </p>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="py-1 px-5 rounded m-1 my-btn"
              onClick={() => {
                (
                  document.getElementById("delete_modal") as HTMLDialogElement
                ).close();
              }}
            >
              キャンセル
            </button>
            <button
              type="button"
              className="bg-red-500 text-white font-semibold py-1 px-5 rounded m-1 my-btn"
              onClick={async () => {
                try {
                  await axiosInstance.delete(`/recipes/${id}`);
                  router.back();
                  setMessage("レシピを削除しました。");
                } catch (error) {
                  console.error(error);
                }
              }}
            >
              削除
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  ) : (
    <Loading />
  );
};
