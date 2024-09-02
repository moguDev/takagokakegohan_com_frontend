import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="p-1 inline-block">
      <div className="p-0.5 cursor-pointer transition-all duration-300 w-full my-btn">
        <div className="h-40 relative">
          {recipe.image.url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image.url}`}
              alt="sampleImage"
              className="object-cover rounded"
              fill
            />
          ) : (
            <div className="bg-gray-100 rounded text-gray-300 w-full h-full flex flex-col items-center justify-center">
              <span className="material-icons">hide_image</span>
              <p className="text-xs font-semibold">画像がありません</p>
            </div>
          )}
        </div>
        <section className="p-1">
          <p className="text-sm select-none font-semibold text-black">
            {recipe.title}
          </p>
          <div className="flex items-center justify-between text-gray-500 pb-1">
            <p className="text-sm">{recipe.user_id}</p>
            <p className="text-xs flex items-center text-yellow-500">
              <span>★</span>
              {4.5}
            </p>
          </div>
        </section>
      </div>
    </Link>
  );
};
