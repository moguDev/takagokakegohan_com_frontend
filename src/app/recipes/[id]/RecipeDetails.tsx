"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useParams, usePathname, useRouter } from "next/navigation";

export const RecipeDetails = () => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const { id } = useParams();
  const { recipe } = useRecipeDetails(Number(id));
  const router = useRouter();
  const pathName = usePathname();

  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="w-full">
      <div className="max-w-4xl mx-auto p-2">
        <section className="lg:flex w-full h-full">
          <div className="p-3 w-full h-96 relative">
            {recipe?.image.url ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image.url}`}
                alt="sample"
                className="object-cover p-1 rounded-lg"
                fill
              />
            ) : (
              <div className="bg-gray-200 bg-opa text-gray-300 w-full h-full flex flex-col items-center justify-center rounded">
                <span className="material-icons select-none">hide_image</span>
                <p className="text-xs select-none">レシピの画像がありません</p>
              </div>
            )}
          </div>
          <div className="px-3 w-full h-auto flex flex-col justify-between">
            <section>
              <div className="mb-4">
                <h1 className="text-2xl font-bold pt-2">{recipe?.title}</h1>
                <div className="flex items-end justify-between">
                  <p className="p-1">{recipe?.user_id}</p>
                  <p className="text-xs">
                    調理時間{" "}
                    <span className="text-lg font-semibold">
                      {recipe?.cooking_time}
                    </span>{" "}
                    秒
                  </p>
                </div>
                <p className="p-1 text-sm">{recipe?.body}</p>
              </div>
              <div className="bg-gray-100 rounded p-2 w-full">
                <h2 className="text-lg font-semibold">
                  材料<span className="text-xs">（1人前）</span>
                </h2>
                <div className="p-1 divide-y divide-gray-200 divide-dashed">
                  {recipe?.ingredients &&
                    recipe?.ingredients.map((item, index) => (
                      <p key={index} className="my-auto py-2">
                        <span className="font-semibold">{item.ingredient}</span>
                        <span className="ml-2">{item.amount}</span>
                      </p>
                    ))}
                </div>
              </div>
            </section>
          </div>
        </section>
        <section className="mt-2 p-5">
          <h2 className="lg:text-2xl text-lg font-semibold pb-2 border-b border-black">
            作り方
          </h2>
          <section className="divide-y divide-gray-200">
            <div className="flex items-start py-3 text-sm">
              <p className="pr-2">{1}.</p>
              <p>{"適当な器に卵を割り入れます。"}</p>
            </div>
            <div className="flex items-start py-3 text-sm">
              <p className="pr-2">{2}.</p>
              <p>{"めんつゆを加え、よく混ぜます。"}</p>
            </div>
            <div className="flex items-start py-3 text-sm">
              <p className="pr-2">{3}.</p>
              <p>{"溢れないように白ごはんに流し入れ、よく混ぜます。"}</p>
            </div>
            <div className="flex items-start py-3 text-sm">
              <p className="pr-2">{4}.</p>
              <p>{"できあがり。"}</p>
            </div>
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
  );
};
