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
} from "@/app/[name]/components/EditProfileModal";
import { useRelationship } from "@/hooks/useRelationship";
import Loading from "../loading";
import { getImageUrl } from "@/lib";
import {
  FollowListModal,
  showFollowListModal,
} from "./components/FollowListModal";
import { UserProfiles } from "@/types";
import { ParagraphWithLinks } from "@/components/ParagraphWithLinks";

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
    isOpen: boolean;
  }>({ title: "フォロー中", users: followings, isOpen: false });

  useEffect(() => {
    reload();
  }, [auth]);

  useEffect(() => {
    modalData.isOpen && showFollowListModal();
  }, [modalData]);

  const handleCloseModal = () =>
    setModalData((prev) => ({ ...prev, isOpen: false }));

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
    <div className="max-w-4xl mx-auto bg-white rounded-lg">
      {/* メインプロフィール */}
      <section className="mx-2 p-5">
        <section>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {/* アイコン */}
              <div className="h-16 w-16 rounded-full shadow relative">
                <Image
                  src={getImageUrl(userProfiles.avatar.url) || defaultImage}
                  alt="アイコン"
                  className="object-cover rounded-full"
                  fill
                />
              </div>
              {/* 名前・ID */}
              <h2 className="ml-2 text-xl font-bold">
                {userProfiles?.nickname}
              </h2>
              <p className="ml-1 text-sm text-gray-400">@{userProfiles.name}</p>
            </div>
          </div>
          {/* 料理人ランク */}
          <p className="w-max text-xs font-semibold bg-white rounded my-3 px-4 py-0.5 bg-gradient-single shadow select-none">
            <span className="text-black">{userProfiles.rank}料理人</span>
          </p>
          {/* 自己紹介 */}
          <div className="mt-3 text-sm">
            <ParagraphWithLinks text={userProfiles.introduction} />
          </div>
          {/* フォロー中・フォロワー */}
          <div className="flex items-center text-md w-full">
            <button
              className="select-none pr-5 py-2"
              onClick={() => {
                setModalData({
                  title: "フォロー中",
                  users: followings,
                  isOpen: true,
                });
              }}
            >
              <span className="font-black text-lg text-blue-900 mr-0.5">
                {followings.length}
              </span>
              フォロー中
            </button>
            <button
              className="select-none py-2"
              onClick={() => {
                setModalData({
                  title: "フォロワー",
                  users: followers,
                  isOpen: true,
                });
              }}
            >
              <span className="font-black text-lg text-blue-900 mr-0.5">
                {followers.length}
              </span>
              フォロワー
            </button>
          </div>
          {/* 自分以外ならフォロー・フォロー中ボタンの表示 */}
          {auth.name === name ? (
            <button
              className="text-gray-500 bg-opacity-0 w-full border border-gray-400 rounded-md text-sm mt-3 py-2 my-btn"
              onClick={showEditProfileModal}
            >
              プロフィールを編集
            </button>
          ) : isFollowed ? (
            <button
              className="text-yellow-600 bg-opacity-0 w-full border border-yellow-600 rounded-md text-sm mt-3 py-2 my-btn"
              onClick={unfollow}
            >
              フォロー中
            </button>
          ) : (
            <button
              className="text-white bg-yellow-600 w-full border rounded-md text-sm mt-3 py-2 my-btn"
              onClick={follow}
            >
              フォローする
            </button>
          )}
        </section>
      </section>
      {/* 投稿したレシピ一覧 */}
      <section className="mb-5 mx-2 py-3 border-t border-gray-200">
        <div className="md:mx-4 mx-2 mt-2">
          <div className="flex items-center justify-between text-black mb-2 px-2">
            <h2 className="flex items-center font-semibold md:text-lg text-base">
              <span className="material-icons text-yellow-600 mr-1">edit</span>
              投稿したレシピ
            </h2>
            <p className="font-semibold text-gray-500">
              {recipes.filter((recipe) => recipe.status === "published").length}
              件
            </p>
          </div>
          {recipes.filter((recipe) => recipe.status === "published").length >
          0 ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
              {recipes
                .filter((recipe) => recipe.status === "published")
                .map((recipe, index) => (
                  <RecipeCard key={index} recipe={recipe} />
                ))}
            </div>
          ) : (
            <div className="p-5 min-h-80 flex items-center justify-center">
              <p className="text-center text-gray-400">
                投稿したレシピはありません。
              </p>
            </div>
          )}
        </div>
      </section>
      <EditProfileModal />
      <FollowListModal
        title={modalData.title}
        users={modalData.users}
        onClose={handleCloseModal}
      />
    </div>
  );
};
