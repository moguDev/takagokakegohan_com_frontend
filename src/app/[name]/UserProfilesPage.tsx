"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useParams } from "next/navigation";
import defaultImage from "/public/images/default_avatar.png";
import { useUserProfiles } from "@/hooks/useUserProfiles";
import { useEffect, useState } from "react";
import {
  EditProfileModal,
  showEditProfileModal,
} from "@/components/EditProfileModal";
import { useRelationship } from "@/hooks/useRelationship";
import Loading from "../loading";
import { UserProfiles } from "@/types";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";

const FollowListModal = ({
  title,
  users,
  onClose,
}: {
  title: string;
  users: UserProfiles[];
  onClose: () => void;
}) => {
  const { auth } = useAuth();
  const { loading, followings, check } = useRelationship(auth.name);

  const follow = async (name: string) => {
    try {
      await axiosInstance.post(`/users/${name}/relationship`);
      check();
    } catch (error) {
      console.error(error);
    }
  };

  const unfollow = async (name: string) => {
    try {
      await axiosInstance.delete(`/users/${name}/relationship`);
      check();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog id="follow-list-modal" className="modal" open>
      <div className="modal-box bg-white rounded-lg shadow-xl border">
        <div className="flex items-center justify-between pb-3 border-b border-gray-200">
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="text-blue-900 text-lg font-bold">{users.length}</p>
        </div>
        <ul className="mt-3">
          {users.length > 0 ? (
            users.map((user, index) => (
              <li
                key={index}
                className="py-3 flex items-center justify-between"
              >
                <Link href={`/${user.name}`} className="flex items-center">
                  <div className="h-10 w-10 rounded-full border-2 border-white border-opacity-50 shadow relative">
                    <Image
                      src={
                        user.avatar.url
                          ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${user.avatar.url}`
                          : defaultImage
                      }
                      alt="アイコン"
                      className="object-cover rounded-full"
                      fill
                    />
                  </div>
                  <div className="ml-2">
                    <p className="font-bold">{user.nickname}</p>
                    <p className="text-gray-500 font-thin text-xs">
                      @{user.name}
                    </p>
                  </div>
                </Link>
                <div className="relative">
                  {loading && (
                    <div className="absolute bg-white w-full h-full flex items-center justify-center z-10">
                      <span className="loading loading-dots loading-xs text-yellow-600" />
                    </div>
                  )}
                  {auth.name !== user.name &&
                    (followings.some(
                      (followUser) => followUser.name === user.name
                    ) ? (
                      <button
                        className="text-xs rounded-full bg-opadicy-0 px-3 py-2 text-yellow-600 font-semibold border border-yellow-600 my-btn"
                        onClick={() => {
                          unfollow(user.name);
                        }}
                      >
                        フォロー中
                      </button>
                    ) : (
                      <button
                        className="text-xs rounded-full bg-yellow-600 px-3 py-2 text-white font-semibold my-btn"
                        onClick={() => {
                          follow(user.name);
                        }}
                      >
                        フォローする
                      </button>
                    ))}
                </div>
              </li>
            ))
          ) : (
            <p className="text-sm text-center text-gray-500">{`${title}のユーザはいません`}</p>
          )}
        </ul>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button onClick={onClose}>close</button>
      </form>
    </dialog>
  );
};

export const UserProfilesPage: React.FC = () => {
  const { auth } = useAuth();
  const { name } = useParams();
  const { userProfiles, recipes, reload, loading, error } = useUserProfiles(
    name as string
  );
  const { isFollowed, followings, followers, follow, unfollow } =
    useRelationship(name as string);

  const [modalData, setModalData] = useState<{
    title: string;
    users: UserProfiles[];
  } | null>(null);

  useEffect(() => {
    reload();
  }, [auth]);

  const handleCloseModal = () => setModalData(null);

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
  ) : loading ? (
    <Loading />
  ) : (
    <div className="max-w-4xl mx-auto">
      <section className="mx-2 p-5 bg-gradient-single rounded-md shadow">
        <div className="font-bold cursor-pointer flex justify-end mb-1">
          {auth.name === name ? (
            <button
              className="font-bold text-gray-600 w-max border rounded-full border-gray-300 bg-gray-100 text-xs px-5 py-1 my-btn"
              onClick={showEditProfileModal}
            >
              編集
            </button>
          ) : isFollowed ? (
            <button
              className="text-yellow-600 bg-opacity-0 w-max border border-yellow-600 rounded-full text-xs px-4 py-2 my-btn"
              onClick={unfollow}
            >
              フォロー中
            </button>
          ) : (
            <button
              className="text-white bg-yellow-600 w-max border rounded-full text-xs px-4 py-2 my-btn"
              onClick={follow}
            >
              フォローする
            </button>
          )}
        </div>
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
          </p>
          <div className="w-full border-b mb-2" />
          <div className="flex items-center justify-center w-full">
            <button
              className="flex flex-col items-center select-none md:w-1/5 w-1/3 p-2 rounded-lg"
              onClick={() =>
                setModalData({
                  title: "フォロー中",
                  users: followings,
                })
              }
            >
              <span className="text-xs text-gray-600">フォロー中</span>
              <span className="mr-1 font-black text-2xl text-blue-900">
                {followings.length}
              </span>
            </button>
            <button
              className="flex flex-col items-center select-none md:w-1/5 w-1/3 p-2 rounded-lg"
              onClick={() =>
                setModalData({
                  title: "フォロワー",
                  users: followers,
                })
              }
            >
              <span className="text-xs text-gray-600">フォロワー</span>
              <span className="mr-1 font-black text-2xl text-blue-900">
                {followers.length}
              </span>
            </button>
          </div>
        </div>
      </section>
      <section className="mx-2 my-5 p-2 py-3 bg-white rounded shadow">
        <div className="flex items-center justify-between text-gray-500 mb-2 px-2">
          <h2 className="font-semibold text-lg">投稿したレシピ</h2>
          <p>
            {recipes.filter((recipe) => recipe.status === "published").length}件
          </p>
        </div>
        <div className="grid md:grid-cols-4 grid-cols-2">
          {recipes
            .filter((recipe) => recipe.status === "published")
            .map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
        </div>
      </section>
      <EditProfileModal />
      {modalData && (
        <FollowListModal
          title={modalData.title}
          users={modalData.users}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};
