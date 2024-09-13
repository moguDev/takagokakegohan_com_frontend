"use client";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import defaultImage from "/public/images/default_avatar.png";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useEditRecipe, RecipeFormData } from "@/hooks/useEditRecipe";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";
import { Loading } from "@/components/Loading";
import { getImageUrl } from "@/lib";

export const RecipesEditForm: React.FC = () => {
  const setMessage = useSetRecoilState(toastState);
  const { id } = useParams();
  const router = useRouter();
  const { auth } = useAuth();
  const { update, loading } = useEditRecipe();
  const { recipe } = useRecipeDetails(Number(id));
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultValues: RecipeFormData = {
    title: "",
    body: "",
    cookingTime: 0,
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
    if (recipe) {
      if (recipe.user.name !== auth.name) {
        router.back();
        setMessage("レシピの編集権限がありません");
      }
      setValue("title", recipe.title);
      setValue("body", recipe.body);
      setValue("cookingTime", recipe.cookingTime);
      setValue(
        "ingredients",
        recipe.recipeIngredients.map(({ ingredientName, amount }) => ({
          name: ingredientName,
          amount,
        })) || [{ name: "", amount: "" }]
      );
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

  return (
    <div className="w-full relative">
      {loading && <Loading text="更新中..." />}
      <form
        method="post"
        onSubmit={handleSubmit((data: RecipeFormData) => {
          update(id as string, data, "published");
        })}
        className="max-w-4xl mx-auto"
      >
        <div className="w-full px-2 bg-white rounded-md">
          <section className="md:flex p-3 mb-1 w-full">
            <button
              type="button"
              className="bg-gray-100 m-1 rounded md:w-1/2 w-full h-96 flex items-center justify-center my-btn relative"
              onClick={() => {
                fileInputRef.current?.click();
              }}
            >
              <div
                className={`
                  absolute top-0 left-0 bg-white rounded w-full h-full z-10 opacity-0
                  hover:opacity-20 transition-all duration-200 material-icons`}
              >
                <span className="w-full h-full flex items-center justify-center">
                  add_a_photo
                </span>
              </div>
              {recipe?.image.url || imageSource ? (
                <Image
                  src={
                    getImageUrl(recipe?.image.url as string | null) ||
                    imageSource
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
            <div className="md:w-1/2 md:ml-1 w-full">
              <input
                type="text"
                className="w-full bg-gray-100 text-xl font-semibold outline-none my-1 p-2 rounded-md"
                placeholder="たまごかけごはんの名前"
                {...register("title", {
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
                    src={getImageUrl(auth.avatar.url) || defaultImage}
                    alt="アイコン"
                    className="object-cover rounded-full"
                    fill
                  />
                </div>
                <p className="text-xs font-semibold">{auth.nickname}</p>
              </div>
              <textarea
                className="w-full bg-gray-100 rounded outline-none my-2 p-2"
                placeholder="説明、メッセージ、コメントなど"
                {...register("body", {
                  maxLength: {
                    value: 128,
                    message: "128文字以内にしてください。",
                  },
                })}
              />
              <div className="text-red-500 text-xs p-1">
                {errors.body?.message}
              </div>
            </div>
          </section>
          <div className="md:flex">
            <section className="md:w-1/2 w-full">
              <div className="md:p-2 p-5 mb-1">
                <section className="border-b border-gray-300 mb-3">
                  <h2 className="text-sm text-gray-400 font-semibold pb-2 flex items-center">
                    <span className="material-icons scale-75 text-yellow-500">
                      timer
                    </span>
                    調理時間
                  </h2>
                  <div className="flex items-center">
                    <input
                      type="number"
                      className="text-center w-1/4 bg-gray-100 rounded outline-none my-1 mr-1 p-1.5"
                      placeholder="30"
                      {...register("cookingTime", {
                        required: "調理時間を入力してください",
                        min: {
                          value: 1,
                          message: "調理時間が不正です。",
                        },
                      })}
                    />
                    秒
                    <span className="text-xs text-red-400 font-bold ml-1">
                      ※ご飯の炊飯時間は含みません
                    </span>
                  </div>
                  <div className="text-red-500 text-xs p-1">
                    {errors.cookingTime?.message}
                  </div>
                </section>
                <section className="border-b border-gray-300">
                  <h2 className="text-sm text-gray-400 font-semibold pt-3 pb-2 flex items-center">
                    <span className="material-icons scale-75 text-yellow-500">
                      egg
                    </span>
                    調味料・食材
                  </h2>
                  {ingredientField.map((field, index) => (
                    <>
                      <div
                        key={index}
                        className="flex items-center border-b border-gray-300 border-dashed my-2"
                      >
                        <span className="font-black text-yellow-600">・</span>
                        <input
                          type="text"
                          className="w-2/3 bg-gray-100 bg-opacity-75 rounded outline-none my-1 p-2"
                          placeholder="調味料・食材"
                          {...register(`ingredients.${index}.name`, {
                            required: "食材名を入力してください。",
                          })}
                        />
                        <input
                          type="text"
                          className="w-1/3 bg-gray-100 bg-opacity-75 rounded outline-none my-1 ml-1 p-2"
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
                        <div className="text-red-500 text-xs p-1">
                          {errors.ingredients?.message}
                        </div>
                      </div>
                    </>
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
            <section className="md:w-1/2 w-full md:ml-1">
              <div className="md:p-2 p-5 h-max">
                <h2 className="text-sm text-gray-400 font-semibold pb-1 flex items-center">
                  <span className="material-icons scale-75 text-yellow-500">
                    restaurant
                  </span>
                  作り方
                </h2>
                {stepFields.map((field, index) => (
                  <>
                    <div
                      key={index}
                      className="border-b border-gray-300 border-dashed my-2"
                    >
                      <div className="flex items-center">
                        <p className="inline text-gray-500 font-bold">
                          {index + 1}.{" "}
                        </p>
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
                    <div className="text-red-500 text-xs p-1">
                      {errors.steps?.message}
                    </div>
                  </>
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
        </div>
        <div
          className={`
        md:relative fixed bottom-0 left-0 bg-white md:border-none md:rounded-md border-t border-gray-200 max-w-4xl
        h-16 w-full mt-2 md:mb-2 p-2 flex justify-between z-10`}
        >
          <button
            type="button"
            onClick={() => router.back()}
            className="flex items-center my-btn text-sm"
            tabIndex={-1}
          >
            <span className="material-icons">navigate_before</span>
            もどる
          </button>
          <div className="flex items-center">
            <button
              type="button"
              className="material-icons p-3 m-0.5 bg-red-500 text-white rounded my-btn"
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
              className="material-icons p-3 m-0.5 border border-gray-500 text-gray-500 rounded my-btn"
              onClick={handleSubmit((data: RecipeFormData) => {
                update(id as string, data, "draft");
              })}
            >
              <p className="text-sm">下書き保存</p>
            </button>
            <button
              type="submit"
              className="material-icons p-3 m-0.5 px-5 bg-blue-600 text-white rounded my-btn"
            >
              <p className="text-sm font-bold">公開する</p>
            </button>
          </div>
        </div>
      </form>
      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-white rounded">
          <h3 className="font-bold text-md">レシピを削除しますか？</h3>
          <p className="flex items-center py-4 text-red-500 text-sm font-semibold">
            ※削除したレシピは元に戻すことはできません。
          </p>
          <div className="flex items-center justify-end">
            <button
              type="button"
              className="py-3 px-5 rounded m-1 my-btn"
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
              className="bg-red-500 text-white font-semibold py-3 px-5 rounded m-1 my-btn"
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
  );
};
