import Image from "next/image";
import sampleImage from "/public/images/bg_photo_tkg.png";
import Link from "next/link";
import { Recipe } from "@/hooks/useRecipes";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="p-1 inline-block">
      <div className="bg-white p-4 shadow hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300">
        <Image
          src={sampleImage}
          alt="sampleImage"
          className="w-64 h-72 object-cover"
        />
        <section className="px-1 pt-1 pb-3">
          <div className="flex items-center justify-between py-1">
            <p className="text-lg select-none text-black font-bold">
              {recipe.title}
            </p>
            <p className="text-xs flex items-center text-yellow-500">
              <span>★</span>
              {4.5}
            </p>
          </div>
          <div className="flex items-center justify-between text-gray-500 pb-1">
            <p className="text-sm">{recipe.user_id}</p>
            <p className="text-xs">調理時間 {recipe.cooking_time}秒</p>
          </div>
        </section>
      </div>
    </Link>
  );
};
