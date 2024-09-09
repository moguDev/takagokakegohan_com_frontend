"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfiles } from "@/hooks/useUserProfiles";

export const DraftRecipesPage = () => {
  const { auth } = useAuth();
  const { recipes, loading, error } = useUserProfiles(auth.name as string);
  return (
    <section className="max-w-7xl mx-auto">
      <section className="px-1 py-3 bg-white rounded-lg md:mx-4 mx-2">
        <div className="flex items-center justify-between mx-2 mb-2">
          <h2 className={`flex items-center text-black text-base font-bold`}>
            <span className="material-icons text-yellow-600 mr-1">
              edit_note
            </span>
            下書き中のレシピ
          </h2>
          <p className="text-gray-500 font-semibold">
            {recipes.filter((recipe) => recipe.status === "draft").length}件
          </p>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2 p-2">
          {recipes
            .filter((recipe) => recipe.status === "draft")
            .map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
      </section>
    </section>
  );
};
