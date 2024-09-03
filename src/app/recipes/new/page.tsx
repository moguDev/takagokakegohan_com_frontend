"use client";
import { axiosInstance } from "@/lib/axiosInstance";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

interface RecipeData {
  title: string;
  body: string;
  cooking_time: number;
  image: FileList | null;
  // ingredients: Ingredient[];
  // steps: Step[];
}

interface Ingredient {
  name: string;
  amount: string;
}

interface Step {
  stemNumber: number;
  instruction: string;
  image: FileList | null;
}

const RecipesEditPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const defaultValues: RecipeData = {
    title: "",
    body: "",
    cooking_time: 30,
    image: null,
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const imageFile = watch("image");
  const [imageSource, setImageSource] = useState("");
  const router = useRouter();

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

  const postRecipe = async (recipe: RecipeData) => {
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
        onSubmit={handleSubmit((recipe: RecipeData) => {
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
              className="w-full bg-gray-50 rounded text-xl outline-none my-1 p-2"
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
                <h2 className="text-sm text-gray-400 font-bold pb-2">
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
              <h2 className="text-sm text-gray-500 pb-2">調味料・食材</h2>
              <div className="flex items-center">
                <p className="inline">・</p>
                <input
                  type="text"
                  className="w-2/3 bg-gray-50 rounded outline-none my-1 px-1 py-2"
                  placeholder="調味料・食材"
                />
                <input
                  type="text"
                  className="w-1/3 bg-gray-50 rounded outline-none my-1 ml-1 px-1 py-2"
                  placeholder="分量"
                />
              </div>
              <div className="flex items-center">
                <p className="inline">・</p>
                <input
                  type="text"
                  className="w-2/3 bg-gray-50 rounded outline-none my-1 px-1 py-2"
                  placeholder="調味料・食材"
                />
                <input
                  type="text"
                  className="w-1/3 bg-gray-50 rounded outline-none my-1 ml-1 px-1 py-2"
                  placeholder="分量"
                />
              </div>
            </div>
          </section>
          <section className="lg:w-2/3 w-full lg:ml-1">
            <div className="p-5 h-max">
              <h2 className="text-sm text-gray-500 pb-2">作り方</h2>
              <div className="border-b border-gray-200 mb-3">
                <div className="flex items-center">
                  <p className="inline">{"1"}. </p>
                  <input
                    type="text"
                    className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                    placeholder="適当な器に卵を割り入れ、よく混ぜる"
                  />
                  <button className="material-icons text-gray-400 scale-75">
                    close
                  </button>
                </div>
                <input type="file" className="hidden" />
              </div>
              <div className="border-b border-gray-200 mb-3">
                <div className="flex items-center">
                  <p className="inline">{"2"}. </p>
                  <input
                    type="text"
                    className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                    placeholder="適当な器に卵を割り入れ、よく混ぜる"
                  />
                  <button className="material-icons text-gray-400 scale-75">
                    close
                  </button>
                </div>
                <input type="file" className="hidden" />
              </div>
              <div className="border-b border-gray-200 mb-3">
                <div className="flex items-center">
                  <p className="inline">{"3"}. </p>
                  <input
                    type="text"
                    className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                    placeholder="適当な器に卵を割り入れ、よく混ぜる"
                  />
                  <button className="material-icons text-gray-400 scale-75">
                    close
                  </button>
                </div>
                <input type="file" className="hidden" />
              </div>
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
          >
            <span className="material-icons">arrow_back</span>
            もどる
          </button>
          <div className="flex items-center">
            <button
              type="button"
              className="material-icons p-2 m-1 bg-red-400 text-white rounded my-btn"
              onClick={() => []}
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

export default RecipesEditPage;
