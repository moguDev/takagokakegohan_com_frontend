"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useParams } from "next/navigation";
import defaultImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useEffect } from "react";
import { showEditProfileModal } from "@/components/EditProfileModal";
import { useRelationship } from "@/hooks/useRelationship";

export const UserProfiles: React.FC = async () => {
  const { auth } = useAuth();
  const { name } = useParams();
  const { userProfiles, recipes, reload, loading, error } = useUserProfiles(
    name as string
  );
  const { isFollowed } = useRelationship();

  useEffect(() => {
    reload();
  }, [auth]);

  return error === "404" ? (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen w-screen">
      <div className="h-20 w-20 rounded-full relative">
        <Image
          src={defaultImage}
          alt="アイコン"
          className="object-cover rounded-full"
          fill
        />
      </div>
      <p className="text-gray-500 text-2xl font-bold pt-2 pb-5">@{name}</p>
      <p className="text-gray-500">このアカウントは存在しません。</p>
    </div>
  ) : (
    <div>
      <section className="mx-2 p-5 bg-gradient-single rounded-md shadow">
        {auth.name === name ? (
          <label
            className="opacity-60 cursor-pointer flex justify-end mb-1"
            onClick={showEditProfileModal}
          >
            <p className="font-bold text-gray-600 w-max border rounded-full border-gray-300 bg-gray-100 text-xs px-5 py-1 my-btn">
              編集
            </p>
          </label>
        ) : (
          <label className="font-bold cursor-pointer flex justify-end mb-1">
            <p className="text-white bg-yellow-600 w-max border rounded-full text-xs px-4 py-2 my-btn">
              フォローする
            </p>
          </label>
        )}
        <div className="flex flex-col justify-center items-center">
          <div className="h-32 w-32 rounded-full border-4 border-white border-opacity-50 shadow relative">
            <Image
              src={userProfiles.avatar.url || defaultImage}
              alt="アイコン"
              className="object-cover rounded-full"
              fill
            />
          </div>
          <h2 className="text-2xl font-bold mt-2">{userProfiles?.nickname}</h2>
          <p className="text-gray-500">@{userProfiles.name}</p>
          <p className="font-bold bg-white rounded-full my-3 px-10 py-1 border border-white shadow-sm select-none">
            <span className="text-black">{userProfiles.rank}料理人</span>
            {false && <span className="text-yellow-100 ml-1">{"★★★"}</span>}
          </p>
          <div className="w-full border-b mb-2" />
          <div className="flex items-center justify-center w-full">
            <p className="flex flex-col items-center select-none md:w-1/5 w-1/3 p-2 rounded-lg">
              <span className="text-xs text-gray-600">フォロー中</span>
              <span className="mr-1 font-black text-2xl text-blue-900">
                {12}
              </span>
            </p>
            <p className="flex flex-col items-center select-none md:w-1/5 w-1/3 p-2 rounded-lg">
              <span className="text-xs text-gray-600">フォロワー</span>
              <span className="mr-1 font-black text-2xl text-blue-900">
                {34}
              </span>
            </p>
          </div>
        </div>
      </section>
      <section className="my-5 p-2">
        <div className="flex items-center justify-between text-gray-500 mb-2 px-2">
          <h2 className="font-semibold text-lg">投稿したレシピ</h2>
          <p>
            {recipes.filter((recipe) => recipe.status === "published").length}件
          </p>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2">
          {recipes
            .filter((recipe) => recipe.status === "published")
            .map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
      </section>
      <section className="my-5 p-2">
        <div className="flex items-center justify-between text-gray-500 mb-2 px-2">
          <h2 className="font-semibold text-lg">下書き</h2>
          <p>
            {recipes.filter((recipe) => recipe.status === "draft").length}件
          </p>
        </div>
        <div className="grid lg:grid-cols-4 grid-cols-2">
          {recipes
            .filter((recipe) => recipe.status === "draft")
            .map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
      </section>
    </div>
  );
};
