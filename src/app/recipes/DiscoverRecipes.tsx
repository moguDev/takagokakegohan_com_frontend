"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";

export const DiscoverRecipes = () => {
  const { recipes } = useRecipes();
  return (
    <div className="w-full">
      <div className="bg-white w-full px-4 fixed top-16 pb-2 z-10 border-b border-gray-100">
        <div className="bg-gray-50 rounded-full border border-gray-100 flex items-center p-2 w-full">
          <span className="material-icons text-gray-300">search</span>
          <input
            type="text"
            className="bg-gray-50 w-full outline-none"
            placeholder="食材や調味料で検索"
          />
        </div>
      </div>
      <section className="pt-16 w-full">
        <h2 className={`mx-2 flex items-center text-black text-base font-bold`}>
          <span className="material-icons text-yellow-600 mr-2">
            new_releases
          </span>
          注目のたまごかけごはん
        </h2>
        <div className="grid lg:grid-cols-6 grid-cols-2 p-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
        <h2 className={`mx-2 flex items-center text-black text-base font-bold`}>
          <span className="rounded bg-red-600 text-white text-xs p-1 mr-2">
            NEW
          </span>
          新着のたまごかけごはん
        </h2>
        <div className="grid lg:grid-cols-6 grid-cols-2 p-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};
