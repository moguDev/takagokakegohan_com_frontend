"use client";
import { EditProfileModal } from "@/components/EditProfileModal";
import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import { useRecipes } from "@/hooks/useRecipes";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const UserDetailsPage: React.FC = () => {
  const { auth } = useAuth();
  const { recipes } = useRecipes();
  const { id } = useParams();
  const [imageURL, setImageURL] = useState("");

  useEffect(() => {
    auth.avatar && setImageURL(`http://localhost:3000${auth.avatar}`);
  }, [auth]);

  return (
    <div className="max-w-4xl mx-auto pt-20">
      <div className="">
        <section className="m-1 p-5 bg-gradient-single rounded-md shadow">
          <div className="flex items-start justify-between">
            <div className="h-20 w-20 relative">
              <Image
                src={imageURL}
                alt="アイコン"
                className="object-cover rounded-full"
                fill
              />
            </div>
            {auth.user_id && auth.user_id.toString() === id[0] && (
              <label
                htmlFor="edit-profile-modal"
                className="flex items-center text-gray-700 font-semibold text-sm py-0.5 px-3 opacity-80 my-btn rounded-full border border-gray-700 cursor-pointer my-btn"
              >
                <span className="material-icons scale-75">edit</span>
                編集
              </label>
            )}
          </div>
          <div className="flex items-center w-full border-b border-gray-200">
            <h2 className="text-2xl pb-2 mr-2 font-bold">{auth.name}</h2>
            <p className="text-xs bg-gradient text-white rounded-full ml-2 px-6 py-0.5 shadow select-none">
              {"三つ星 ★★★"}
            </p>
          </div>
          <div>
            <p>{}</p>
          </div>
          <div className="pt-2 flex items-end text-gray-500">
            <span className="mr-1 text-xl font-bold text-black">{0}</span>
            フォロー中
            <span className="mr-1 ml-3 text-xl font-bold text-black">{0}</span>
            フォロワー
          </div>
        </section>
        <section className="my-1">
          <div className="grid grid-cols-3">
            {recipes.map((recipe, index) => (
              <RecipeCard id={1} title={recipe.title} cooking_time={30} />
            ))}
          </div>
        </section>
      </div>
      <EditProfileModal />
    </div>
  );
};

export default UserDetailsPage;
