"use client";

import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useBookmarkRecipes } from "@/hooks/useBookmarkRecipes";

export default function SearchPage() {
  const { auth } = useAuth();
  const { recipes } = useBookmarkRecipes(auth.user_id);
  return (
    <section className="max-w-7xl mx-auto">
      <section className="px-1">
        <h2 className={`mx-2 flex items-center text-black text-base font-bold`}>
          <span className="material-icons text-yellow-600 mr-1">bookmark</span>
          ブックマークしたレシピ
        </h2>
        <div className="grid lg:grid-cols-6 md:grid-cols-4 grid-cols-2 p-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </section>
    </section>
  );
}
