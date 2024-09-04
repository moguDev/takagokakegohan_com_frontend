"use client";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import defaultImage from "/public/images/default_avatar.png";
import { Ingredient, Step } from "@/types";

interface FormData {
  title: string;
  body: string;
  cooking_time: number;
  image: FileList | null;
  ingredients: Ingredient[];
  steps: Step[];
}

export const RecipesEditForm: React.FC = () => {
  const router = useRouter();
  const { auth } = useAuth();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultValues: FormData = {
    title: "",
    body: "",
    cooking_time: 30,
    image: null,
    ingredients: [
      { name: "生卵", amount: "1個", category: "卵" },
      { name: "白ごはん", amount: "茶碗1杯", category: "米" },
      { name: "", amount: "", category: "調味料" },
    ],
    steps: [
      { instruction: "", image: null },
      { instruction: "", image: null },
    ],
  };
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const imageFile = watch("image");
  const [imageSource, setImageSource] = useState("");
  const {
    fields: ingredientField,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    name: "ingredients",
  });
  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({ control, name: "steps" });

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

  const postRecipe = async (recipe: FormData) => {
    console.log({
      ...recipe,
      image: recipe.image ? recipe.image[0] : null,
    });
    try {
      const res = await axiosInstance.post(
        "/recipes",
        {
          recipe: {
            ...recipe,
            image: recipe.image ? recipe.image[0] : null,
          },
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      router.push(`/recipes/${res.data.id}`);
    } catch (error) {
      console.error(error);
    } finally {
    }
  };

  return (
    <div className="w-full">
      <form
        method="post"
        onSubmit={handleSubmit((recipe: FormData) => {
          postRecipe(recipe);
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
            {imageSource ? (
              <Image
                src={imageSource}
                alt="アイコン"
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
              {...register("image")}
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
              className="w-full bg-gray-50 rounded text-xl font-semibold outline-none my-1 p-2"
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
          <section className="lg:w-1/3 w-full">
            <div className="p-5 mb-1">
              <section className="border-b border-gray-200 mb-3">
                <h2 className="text-sm text-gray-400 font-semibold pb-2 flex items-center">
                  <span className="material-icons scale-75 text-yellow-500">
                    timer
                  </span>
                  調理時間
                </h2>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 text-center bg-gray-50 rounded outline-none my-1 mr-1 p-2"
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
              <section className="border-b border-gray-200">
                <h2 className="text-sm text-gray-400 font-semibold pb-2 flex items-center">
                  <span className="material-icons scale-75 text-yellow-500">
                    egg
                  </span>
                  調味料・食材
                </h2>
                {ingredientField.map((field, index) => (
                  <div key={index} className="flex items-center">
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
                    <select
                      id="category"
                      className="bg-gray-100 rounded p-1 text-xs"
                      {...register(`ingredients.${index}.category`, {
                        required: true,
                      })}
                    >
                      <option value="卵">卵</option>
                      <option value="米">米</option>
                      <option value="調味料">調味料</option>
                      <option value="食材">食材</option>
                    </select>
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
                  className="my-btn flex items-center justify-center w-full py-2 opacity-60 bg-gray-100 text-gray-400 rounded-lg mb-2"
                  onClick={() =>
                    appendIngredient({ name: "", amount: "", category: "食材" })
                  } // フィールドを追加
                >
                  <span className="material-icons scale-75">add</span>
                  <span className="font-semibold text-sm">
                    調味料・食材を追加
                  </span>
                </button>
              </section>
            </div>
          </section>
          <section className="lg:w-2/3 w-full lg:ml-1">
            <div className="p-5 h-max">
              <h2 className="text-sm text-gray-400 font-semibold pb-2 flex items-center">
                <span className="material-icons scale-75 text-yellow-500">
                  restaurant
                </span>
                作り方
              </h2>
              {stepFields.map((field, index) => (
                <div key={index} className="border-b border-gray-200 mb-3">
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
                className="my-btn flex items-center justify-center w-full py-2 opacity-60 bg-gray-100 text-gray-400 rounded-lg mb-2"
                onClick={() => appendStep({ instruction: "", image: null })}
              >
                <span className="material-icons scale-75">add</span>
                <span className="font-semibold text-sm">工程を追加</span>
              </button>
            </div>
          </section>
        </div>
        <div
          className={`
        fixed bottom-0 bg-white bg-opacity-75 backdrop-blur-xl lg:border lg:rounded-xl border-t border-gray-200 max-w-4xl w-full
        lg:mb-2 px-2 py-1 pb-2 flex justify-between z-10`}
        >
          <button
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
              onClick={() => []}
              tabIndex={-1}
            >
              delete
            </button>
            <button
              type="button"
              className="material-icons p-2 m-1 border border-gray-500 text-gray-500 rounded my-btn"
              onClick={() => []}
            >
              <p className="text-sm">下書き保存</p>
            </button>
            <button
              type="submit"
              className="material-icons p-2 m-1 px-5 bg-yellow-600 text-white rounded my-btn"
              onClick={() => []}
            >
              <p className="text-sm font-bold">公開する</p>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
