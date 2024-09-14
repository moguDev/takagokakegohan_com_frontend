"use client";
import defaultImage from "/public/images/default_avatar.png";
import Link from "next/link";
import { axiosInstance } from "@/lib/axiosInstance";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";
import { UserProfiles } from "@/types";
import { useRelationship } from "@/hooks/useRelationship";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { getImageUrl } from "@/lib";

export const showFollowListModal = () =>
  (
    document.getElementById("follow-list-modal") as HTMLDialogElement
  ).showModal();

export const FollowListModal = ({
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
  const setMessage = useSetRecoilState(toastState);

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
    <dialog id="follow-list-modal" className="modal">
      <div className="modal-box bg-white rounded shadow-xl border">
        <h3 className="font-bold text-lg">{title}</h3>
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
                      src={getImageUrl(user.avatar.url) || defaultImage}
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
                        onClick={() => unfollow(user.name)}
                      >
                        フォロー中
                      </button>
                    ) : (
                      <button
                        className="text-xs rounded-full bg-yellow-600 px-3 py-2 text-white font-semibold my-btn"
                        onClick={() => follow(user.name)}
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
