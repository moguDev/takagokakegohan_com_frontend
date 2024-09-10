"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarkRecipes } from "@/hooks/useBookmarkRecipes";

export const BookmarkRecipesPage = () => {
  const { auth } = useAuth();
  const { recipes } = useBookmarkRecipes(auth.user_id);
  return (
    <div className="">
      <div className="bg-white w-full px-4 fixed top-16 pb-2 z-10 shadow flex">
        <div className="bg-gray-50 rounded-full border border-gray-300 shadow-sm flex items-center p-2 w-full">
          <span className="material-icons text-gray-300">search</span>
          <input
            type="text"
            className="bg-gray-50 w-full outline-none"
            placeholder="食材や調味料で検索"
          />
        </div>
        <div className="md:w-80" />
      </div>
      <section className="md:pt-8 pt-10 md:px-4 px-2">
        <div className="bg-white rounded-lg max-w-7xl mx-auto md:p-5 p-2">
          <div className="flex items-center justify-between p-2 pb-3">
            <h2 className="flex items-center text-black md:text-xl text-base font-bold">
              <span className="material-icons text-yellow-600 mr-1">
                bookmark
              </span>
              ブックマークしたレシピ
            </h2>
            <p className="text-gray-500 font-semibold">{recipes.length}件</p>
          </div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
