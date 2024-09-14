import { Recipe } from "@/types";
import { RecipeCard } from "./RecipeCard";

interface RecipesGridProps {
  recipes: Recipe[];
  loading: boolean;
}

export const RecipesGrid = ({ recipes, loading }: RecipesGridProps) => {
  return recipes.length > 0 ? (
    <div className="relative grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
      {loading && (
        <div className="absolute flex flex-col items-center justify-center h-full w-full bg-white bg-opacity-80 z-10">
          <span className="loading loading-dots text-yellow-500" />
          <p className="text-xs text-gray-500 font-semibold">読み込み中</p>
        </div>
      )}
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
  );
};
