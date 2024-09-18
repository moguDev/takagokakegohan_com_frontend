"use client";
import Image from "next/image";
import Link from "next/link";
import { Recipe } from "@/types";
import defaultImage from "/public/images/default_avatar.png";
import { getImageUrl } from "@/lib";
import { useState } from "react";

export const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <Link
      href={
        recipe.status === "published"
          ? `/recipes/${recipe.id}`
          : `/recipes/${recipe.id}/edit`
      }
      className="p-1 inline-block relative transition-all duration-200 hover:brightness-90 hover:scale-105"
    >
      {recipe.status === "draft" && (
        <p className="absolute top-3 left-3 text-xs bg-gray-400 text-white py-0.5 px-3 rounded-md z-10 opacity-80">
          下書き
        </p>
      )}
      <div className="p-0.5 cursor-pointer transition-all duration-300 w-full my-btn">
        <div className="md:h-52 h-40 relative">
          {recipe.image.url ? (
            <>
              {isLoading && (
                <div className="flex items-center justify-center bg-gray-100 bg-opacity-75 absolute h-full w-full z-10">
                  <span className="loading loading-spinner loading-sm text-gray-500" />
                </div>
              )}
              <Image
                src={getImageUrl(recipe.image.url) || defaultImage}
                alt={recipe.title}
                className="object-cover rounded"
                fill
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                unoptimized
              />
            </>
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
                  src={getImageUrl(recipe?.user.avatar.url) || defaultImage}
                  alt="アイコン"
                  className="object-cover rounded-full"
                  fill
                />
              </div>
              <p className="text-xs">{recipe.user.nickname}</p>
            </div>
            {recipe.status === "published" && (
              <p className="text-xs flex items-center text-red-600 font-sans">
                <span
                  className="material-icons mr-0.5"
                  style={{ fontSize: "14px" }}
                >
                  favorite
                </span>
                {recipe.likeCount}
              </p>
            )}
          </div>
        </section>
      </div>
    </Link>
  );
};
