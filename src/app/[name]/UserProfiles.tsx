"use client";
import React, { useEffect } from "react";
import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useRecipes } from "@/hooks/useRecipes";
import Image from "next/image";
import { useParams } from "next/navigation";
import defaultImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserDetails";

export const UserProfiles: React.FC = async () => {
  const { auth, checkAuth } = useAuth();
  const { recipes } = useRecipes();
  const { name } = useParams();
  const { userProfiles, loading, error } = useUserProfiles(name as string);

  return (
    <div>
      <section className="mx-2 p-5 bg-gradient-single rounded-md shadow">
        <div className="flex items-start justify-between">
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
          {auth.name === name && (
            <label
              htmlFor="edit-profile-modal"
              className="flex items-center text-gray-700 font-semibold text-xs py-0.5 px-2 opacity-60 my-btn rounded-full border border-gray-700 cursor-pointer my-btn"
            >
              <span className="material-icons scale-75">edit</span>
              編集
            </label>
          )}
        </div>
        <div className="flex items-center w-full my-1 pb-2 border-b border-gray-200">
          <h2 className="text-2xl mr-2 font-bold">
            {userProfiles?.nickname}
            <span className="text-gray-400 font-normal text-sm ml-1">
              @{userProfiles.name}
            </span>
          </h2>
          <p className="text-xs bg-gradient text-white rounded-full ml-1 px-6 py-0.5 shadow select-none">
            {"三つ星 ★★★"}
          </p>
        </div>
        <div className="pt-1 flex items-end text-gray-500 text-sm">
          <span className="mr-1 font-bold text-base text-black">{0}</span>
          フォロー
          <span className="mr-1 ml-3 text-base font-bold text-black">{0}</span>
          フォロワー
        </div>
      </section>
      <section className="my-1">
        <div className="grid lg:grid-cols-4 grid-cols-2 p-2">
          {recipes.map((recipe, index) => (
            <RecipeCard key={index} recipe={recipe} />
          ))}
        </div>
      </section>
    </div>
  );
};
