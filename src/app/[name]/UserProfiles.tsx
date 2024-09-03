"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useRecipes } from "@/hooks/useRecipes";
import Image from "next/image";
import { useParams } from "next/navigation";
import defaultImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useEffect } from "react";

export const UserProfiles: React.FC = async () => {
  const { auth } = useAuth();
  const { recipes } = useRecipes();
  const { name } = useParams();
  const { userProfiles, loading, error } = useUserProfiles(name as string);

  return (
    <div>
      <section className="mx-2 p-5 bg-gradient-single rounded-md shadow">
        {auth.name === name ? (
          <label
            htmlFor="edit-profile-modal"
            className="font-bold opacity-60 cursor-pointer flex justify-end"
          >
            <p className="text-gray-600 w-max border rounded-full border-gray-600 text-xs px-3 py-1 my-btn">
              編集
            </p>
          </label>
        ) : (
          <label className="font-bold opacity-60 cursor-pointer flex justify-end">
            <p className="text-white bg-yellow-700 w-max border rounded-full text-xs px-3 py-1 my-btn">
              フォロー
            </p>
          </label>
        )}
        <div className="flex flex-col justify-center items-center">
          <div className="h-20 w-20 rounded-full border-2 border-white shadow relative">
            <Image
              src={
                userProfiles.avatar === null
                  ? defaultImage
                  : userProfiles.avatar
              }
              alt="アイコン"
              className="object-cover rounded-full"
              fill
            />
          </div>
          <h2 className="text-3xl font-bold my-1">{userProfiles?.nickname}</h2>
          <p className="text-gray-400 font-normal text-sm">
            @{userProfiles.name}
          </p>
          <p className="text-xs bg-gradient text-white rounded-full my-3 px-6 py-0.5 shadow select-none">
            {"三つ星 ★★★"}
          </p>
          <div className="pt-2 flex items-end justify-center text-gray-500 text-sm border-t border-gray-200 w-full">
            <span className="mr-1 font-bold text-base text-black">{0}</span>
            フォロー
            <span className="mr-1 ml-3 text-base font-bold text-black">
              {0}
            </span>
            フォロワー
          </div>
        </div>
      </section>
      <section className="my-5 p-2">
        <div className="flex items-center justify-between text-gray-500 mb-2 px-2">
          <h2 className="font-semibold text-xl">
            {auth.name == userProfiles.name
              ? "マイ"
              : `${userProfiles.nickname}の`}
            レシピ
          </h2>
          <p>{recipes.length}件</p>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};
