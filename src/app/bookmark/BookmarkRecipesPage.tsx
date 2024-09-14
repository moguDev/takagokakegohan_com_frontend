"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { RecipesGrid } from "@/components/RecipesGrid";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarkRecipes } from "@/hooks/useBookmarkRecipes";

export const BookmarkRecipesPage = () => {
  const { auth } = useAuth();
  const { recipes, loading } = useBookmarkRecipes(auth.user_id);
  return (
    <section className="bg-white rounded-md max-w-7xl mx-auto p-2">
      <div className="flex items-center justify-between p-2 pb-3">
        <h2 className="flex items-center text-black md:text-xl text-base font-bold">
          <span className="material-icons text-yellow-600 mr-1">bookmark</span>
          ブックマークしたレシピ
        </h2>
        <p className="text-gray-500 font-semibold">{recipes.length}件</p>
      </div>
      <RecipesGrid recipes={recipes} loading={loading} />
    </section>
  );
};
