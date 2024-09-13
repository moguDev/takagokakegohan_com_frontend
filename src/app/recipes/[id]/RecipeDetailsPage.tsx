"use client";
import Image from "next/image";
import { useRecipeDetails } from "@/hooks/useRecipeDetails";
import { useParams, usePathname, useRouter } from "next/navigation";
import defaultImage from "/public/images/default_avatar.png";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Loading from "@/app/loading";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";
import { useBookmark } from "@/hooks/useBookmark";
import { getImageUrl } from "@/lib";
import { useFavorite } from "@/hooks/useFavorite";

export const RecipeDetailsPage = () => {
  const setMessage = useSetRecoilState(toastState);
  const { auth } = useAuth();
  const { id } = useParams();
  const { recipe, fetch } = useRecipeDetails(Number(id));
  const {
    isFavorited,
    loading: loadingFavorite,
    favorite,
    unfavorite,
  } = useFavorite(id as string);
  const {
    isBookmarked,
    loading: loadingBookmark,
    bookmark,
    unbookmark,
  } = useBookmark(id as string);
  const router = useRouter();
  const pathName = usePathname();
  const currentUrl = `https://たまごかけごはん.com${pathName}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${recipe?.title}&url=${currentUrl}`;

  return recipe ? (
    <div className="w-full">
      <section className="px-2">
        <div className="bg-white max-w-4xl mx-auto md:p-4 p-2 pt-4 rounded-md">
          {auth.name === recipe.user.name && (
            <div className="flex justify-between pb-4">
              <div>
                {recipe.status === "published" ? (
                  <div className="rounded-full text-sm font-semibold text-blue-600 border-2 border-blue-200 bg-blue-50 px-6 py-1">
                    公開中
                  </div>
                ) : (
                  <div className="rounded-full text-sm font-semibold text-red-600 border-2 border-red-200 bg-red-50 px-6 py-1">
                    下書き
                  </div>
                )}
              </div>
              <Link
                href={`/recipes/${id}/edit`}
                className="flex items-center rounded-full text-xs text-gray-600 border border-gray-200 bg-gray-100 px-4 py-0.5 my-btn"
                replace
              >
                <span className="material-icons" style={{ fontSize: "14px" }}>
                  edit
                </span>
                レシピを編集
              </Link>
            </div>
          )}
          <section className="lg:flex w-full h-full">
            <div className="p-3 w-full h-96 relative">
              {recipe?.image.url ? (
                <Image
                  src={getImageUrl(recipe.image.url) || defaultImage}
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
                  <h1 className="md:text-2xl text-xl font-bold py-2">
                    {recipe?.title || "無題"}
                  </h1>
                  <div className="flex items-end justify-between text-sm mt-1 mb-2">
                    <div className="flex items-center">
                      <Link
                        href={`/${recipe.user.name}`}
                        className="flex items-center"
                      >
                        <div className="rounded-full h-5 w-5 relative mr-0.5">
                          <Image
                            src={
                              getImageUrl(recipe?.user.avatar.url) ||
                              defaultImage
                            }
                            alt="アイコン"
                            className="object-cover rounded-full"
                            fill
                          />
                        </div>
                        <p className="font-semibold underline">
                          {recipe?.user.nickname}
                        </p>
                      </Link>
                    </div>
                    <div className="text-xs">
                      <span className="material-icons text-yellow-500 scale-90 translate-y-[4px]">
                        timer
                      </span>
                      <span className="text-lg font-semibold">
                        {recipe?.cookingTime}
                      </span>
                      <span className="ml-1">秒</span>
                    </div>
                  </div>
                  <p className="p-1 text-sm">{recipe?.body}</p>
                </div>
                <div className="bg-theme rounded-md px-2 py-3 w-full">
                  <h2 className="flex items-center text-base text-gray-600 font-semibold">
                    <span className="material-icons text-yellow-500 mr-1">
                      egg
                    </span>
                    材料<span className="text-xs">（1人前）</span>
                  </h2>
                  <ul className="p-1 divide-y divide-gray-300 divide-dashed">
                    {recipe.recipeIngredients &&
                      recipe?.recipeIngredients.map((ingredient, index) => (
                        <li key={index} className="my-auto py-2">
                          <span className="font-black text-yellow-600">・</span>
                          <span className="font-semibold">
                            {ingredient.ingredientName}
                          </span>
                          <span className="ml-2">{ingredient.amount}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </section>
            </div>
          </section>
          <section className="mt-4 lg:px-0 p-2">
            <h2 className="flex items-center lg:text-xl text-lg font-semibold pb-2 border-b border-gray-300">
              <span className="material-icons text-yellow-500 text-base mr-1">
                restaurant
              </span>
              <span className="text-gray-600">作り方</span>
            </h2>
            <section className="divide-y divide-gray-300 divide-dashed p-1">
              {recipe.steps &&
                recipe?.steps.map((step, index) => (
                  <ul key={index} className="py-3">
                    <li className="flex items-start mr-2">
                      <span className="font-bold text-center text-gray-500 w-5 mr-1">
                        {step.stepNumber}.
                      </span>
                      <p>{step.instruction}</p>
                    </li>
                  </ul>
                ))}
            </section>
          </section>
        </div>
      </section>
      <section className="max-w-4xl mx-auto z-40">
        <div
          className={`
        md:relative fixed bottom-0 left-0 bg-white backdrop-blur-xl md:border-none md:rounded-md border-t border-gray-200 max-w-4xl h-16 w-full
        md:mb-2 mt-2 py-2 flex justify-between`}
        >
          <button
            onClick={() => router.back()}
            className="flex items-center my-btn text-sm pl-1"
          >
            <span className="material-icons">navigate_before</span>
            もどる
          </button>
          <div className="flex items-center justify-end px-3 py-2">
            {recipe.status === "published" && (
              <a
                href={twitterShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black bg-opacity-90 text-white text-xs rounded p-2 flex items-center mx-2 my-btn"
              >
                <span className="material-icons mr-1"></span>
                Xでシェアする
              </a>
            )}
            <div className="relative mx-1">
              {loadingFavorite && (
                <div className="absolute h-full w-full flex items-center justify-center bg-white opacity-90 z-10" />
              )}
              <button
                className={`rounded p-1 flex items-center my-btn transition-all duration-1000 active:scale-125`}
                onClick={async () => {
                  if (auth.isAuthenticated) {
                    isFavorited ? await unfavorite() : await favorite();
                    fetch();
                  } else {
                    setMessage("ログインしてください。");
                  }
                }}
              >
                <p className="flex items-center font-sans">
                  <span
                    className={`material-icons mr-0.5 my-auto ${
                      !auth.isAuthenticated
                        ? "text-gray-400"
                        : isFavorited
                        ? "text-red-600"
                        : "text-black"
                    }`}
                  >
                    {`${
                      auth.isAuthenticated && isFavorited
                        ? "favorite"
                        : "favorite_outline"
                    }`}
                  </span>
                  <span className="text-sm">{recipe.likeCount}</span>
                </p>
              </button>
            </div>
            <div className="relative mx-1">
              {loadingBookmark && (
                <div className="absolute h-full w-full flex items-center justify-center bg-white opacity-90 z-10" />
              )}
              <button
                className={`rounded p-1 flex items-center my-btn transition-all duration-1000 active:scale-125`}
                onClick={async () => {
                  if (auth.isAuthenticated) {
                    isBookmarked ? await unbookmark() : await bookmark();
                    fetch();
                  } else {
                    setMessage("ログインしてください。");
                  }
                }}
              >
                <p className="flex items-center font-sans">
                  <span
                    className={`material-icons mr-0.5 my-auto ${
                      !auth.isAuthenticated
                        ? "text-gray-400"
                        : isBookmarked
                        ? "text-yellow-600"
                        : "text-black"
                    }`}
                  >
                    {`${
                      auth.isAuthenticated && isBookmarked
                        ? "bookmark"
                        : "bookmark_outline"
                    }`}
                  </span>
                  <span className="text-sm">{recipe.bookmarkCount}</span>
                </p>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  ) : (
    <Loading />
  );
};
