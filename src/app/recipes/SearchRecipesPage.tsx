"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { useSearch } from "@/hooks/useSearch";
import { useRouter, useSearchParams } from "next/navigation";
import Loading from "../loading";

export const SearchRecipesPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  if (query === null) {
    router.push("/");
    return <></>;
  }

  const { recipes, loading } = useSearch(query || "");

  return (
    <section className="bg-white rounded-md max-w-7xl mx-auto p-2">
      <div className="flex items-center justify-between p-2 pb-3">
        <h2
          className={`flex items-center text-black md:text-xl text-base font-bold`}
        >
          <span className="material-icons text-yellow-600 mr-1">search</span>
          キーワード：{query}
        </h2>
        <p className="text-gray-500 font-semibold">{recipes.length}件</p>
      </div>
      {recipes.length > 0 ? (
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      ) : (
        <div className="p-5 min-h-64 flex items-center justify-center">
          <p className="text-center text-gray-400">
            レシピが見つかりませんでした。
          </p>
        </div>
      )}
    </section>
  );
};
