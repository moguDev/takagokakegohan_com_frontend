import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types";
import defaultImage from "/public/images/default_avatar.png";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  return (
    <Link href={`/recipes/${recipe.id}`} className="p-1 inline-block">
      <div className="p-0.5 cursor-pointer transition-all duration-300 w-full my-btn">
        <div className="md:h-52 h-40 relative">
          {recipe.image.url ? (
            <Image
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image.url}`}
              alt="sampleImage"
              className="object-cover rounded"
              fill
            />
          ) : (
            <div className="bg-gray-200 bg-opacity-50 rounded text-gray-300 w-full h-full flex flex-col items-center justify-center">
              <span className="material-icons">hide_image</span>
              <p className="text-xs font-semibold">画像がありません</p>
            </div>
          )}
        </div>
        <section className="p-1">
          <p className="text-base select-none font-semibold text-black">
            {recipe.title || "無題"}
          </p>
          <div className="flex items-center justify-between text-gray-500 my-1">
            <div className="flex items-center">
              <div className="rounded-full h-4 w-4 relative mr-0.5">
                <Image
                  src={
                    recipe?.user.avatar.url
                      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe?.user.avatar.url}`
                      : defaultImage
                  }
                  alt="アイコン"
                  className="object-cover rounded-full"
                  fill
                />
              </div>
              <p className="text-xs">{recipe.user.nickname}</p>
            </div>
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
