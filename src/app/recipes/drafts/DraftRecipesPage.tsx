"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useUserProfiles } from "@/hooks/useUserProfiles";

export const DraftRecipesPage = () => {
  const { auth } = useAuth();
  const { recipes, loading, error } = useUserProfiles(auth.name as string);
  return (
    <div className="md:px-4 px-2">
      <section className="bg-white rounded-lg max-w-7xl mx-auto md:p-5 p-2">
        <div className="flex items-center justify-between p-2 pb-3">
          <h2
            className={`flex items-center text-black md:text-xl text-base font-bold`}
          >
            <span className="material-icons text-yellow-600 mr-1">
              edit_note
            </span>
            下書き中のレシピ
          </h2>
          <p className="text-gray-500 font-semibold">
            {recipes.filter((recipe) => recipe.status === "draft").length}件
          </p>
        </div>
        {recipes.filter((recipe) => recipe.status === "draft").length > 0 ? (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
            {recipes
              .filter((recipe) => recipe.status === "draft")
              .map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
          </div>
        ) : (
          <div className="p-5 min-h-64 flex items-center justify-center">
            <p className="text-center text-gray-400">
              下書き中のレシピはありません。
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
