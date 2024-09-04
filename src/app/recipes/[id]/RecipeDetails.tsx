"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useParams, useRouter } from "next/navigation";
import defaultImage from "/public/images/default_avatar.png";

export const RecipeDetails = () => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const { id } = useParams();
  const { recipe } = useRecipeDetails(Number(id));
  const router = useRouter();

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return recipe ? (
    <div className="w-full">
      <div className="max-w-4xl mx-auto p-2">
        <section className="lg:flex w-full h-full">
          <div className="p-3 w-full h-96 relative">
            {recipe?.image.url ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image.url}`}
                alt="sampleImage"
                className="object-cover rounded"
                fill
              />
            ) : (
              <div className="bg-gray-200 bg-opacity-50 rounded text-gray-300 w-full h-full flex flex-col items-center justify-center">
                <span className="material-icons">hide_image</span>
                <p className="text-xs font-semibold">画像がありません</p>
              </div>
            )}
          </div>
          <div className="px-3 w-full h-auto flex flex-col justify-between">
            <section>
              <div className="mb-4">
                <h1 className="text-2xl font-bold pt-2">{recipe?.title}</h1>
                <div className="flex items-end justify-between text-sm mt-1 mb-2">
                  <div className="flex items-center">
                    <div className="rounded-full h-5 w-5 relative mr-0.5">
                      <Image
                        src={
                          `${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe?.user.avatar.url}` ||
                          defaultImage
                        }
                        alt="アイコン"
                        className="object-cover rounded-full"
                        fill
                      />
                    </div>
                    <p className="font-semibold">{recipe?.user.nickname}</p>
                  </div>
                  <div className="text-xs">
                    <span className="mr-1">調理時間</span>
                    <span className="text-lg font-semibold">
                      {recipe?.cooking_time}
                    </span>
                    <span className="ml-1">秒</span>
                  </div>
                </div>
                <p className="p-1 text-sm">{recipe?.body}</p>
              </div>
              <div className="bg-gray-100 rounded px-1 py-2 w-full">
                <h2 className="flex items-center text-base text-gray-600 font-semibold">
                  <span className="material-icons text-yellow-600 mr-1">
                    egg
                  </span>
                  材料<span className="text-xs">（1人前）</span>
                </h2>
                <div className="p-1 divide-y divide-gray-300 divide-dashed">
                  {recipe.ingredients &&
                    recipe?.ingredients.map((ingredient, index) => (
                      <p key={index} className="my-auto py-2">
                        <span className="font-black text-yellow-600">・</span>
                        <span className="font-semibold">{ingredient.name}</span>
                        <span className="ml-2">{ingredient.amount}</span>
                      </p>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="mt-2 px-4 py-2">
          <h2 className="flex items-center lg:text-2xl text-lg font-semibold pb-2 border-b border-gray-400">
            <span className="material-icons text-yellow-600 text-base mr-1">
              restaurant
            </span>
            <span className="text-gray-600">作り方</span>
          </h2>
          <section className="divide-y divide-gray-200 p-1">
            {recipe.steps &&
              recipe?.steps.map((step, index) => (
                <div key={index} className="flex items-start py-3">
                  <div className="font-bold text-center mr-2 relative">
                    <span className="z-10 text-gray-500 w-5">
                      {step.stemNumber}.
                    </span>
                  </div>
                  <p>{step.instruction}</p>
                </div>
              ))}
          </section>
        </section>
      </div>
      <div className="max-w-4xl mx-auto">
        <div
          className={`
        fixed bottom-0 bg-white bg-opacity-75 backdrop-blur-xl lg:border lg:rounded-xl border-t border-gray-200 max-w-4xl w-full
        lg:mb-2 px-2 py-1 flex justify-between`}
        >
          <button
            onClick={() => router.back()}
            className={`mr-1 flex items-center scale-75`}
          >
            <span className="material-icons">arrow_back</span>
            もどる
          </button>
          <div className="flex items-center justify-end px-3 py-2">
            <button className=" text-black rounded p-1 flex items-center mr-1 my-btn">
              <span className="material-icons mr-1"></span>
            </button>
            <button
              className="text-black rounded p-2 flex items-center  my-btn"
              onClick={handleCopyLink}
            >
              <span className="material-icons mr-0.5 my-auto">link</span>
            </button>
            <button
              className={"rounded p-1 flex items-center my-btn"}
              onClick={() => setBookmarked((prev) => !prev)}
            >
              <p className="flex items-center">
                <span
                  className={`material-icons mr-0.5 my-auto ${
                    bookmarked ? "text-yellow-600" : "text-black"
                  }`}
                >
                  {`${bookmarked ? "bookmark" : "bookmark_outline"}`}
                </span>
                {0}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
};
