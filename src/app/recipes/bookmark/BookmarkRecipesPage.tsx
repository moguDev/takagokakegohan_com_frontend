"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarkRecipes } from "@/hooks/useBookmarkRecipes";

export const BookmarkRecipesPage = () => {
  const { auth } = useAuth();
  const { recipes } = useBookmarkRecipes(auth.user_id);
  return (
    <section className="max-w-7xl mx-auto">
      <section className="px-1 py-3 bg-white rounded-lg md:mx-4 mx-2">
        <div className="flex items-center justify-between mx-2 mb-2">
          <h2
            className={`flex items-center text-black md:text-xl text-base font-bold`}
          >
            <span className="material-icons text-yellow-600 mr-1">
              bookmark
            </span>
            ブックマークしたレシピ
          </h2>
          <p className="text-gray-500 font-semibold">{recipes.length}件</p>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 p-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </section>
    </section>
  );
};
