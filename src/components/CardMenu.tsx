"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import Link from "next/link";
import defaultImage from "/public/images/default_avatar.png";
import { useSetRecoilState } from "recoil";
import { toastState } from "./Toast";
import { useRelationship } from "@/hooks/useRelationship";
import { getImageUrl } from "@/lib";

export const CardMenu: React.FC = () => {
  const { auth, logout } = useAuth();
  const { followings, followers } = useRelationship(auth.name);
  const setToast = useSetRecoilState(toastState);
  return (
    <div
      tabIndex={0}
      className="dropdown-content menu bg-gradient-single w-80 mx-auto rounded-md z-[1] mt-7 shadow-2xl"
    >
      <section className="menu min-h-full pt-8 pb-3 px-2 rounded-l">
        <div className="mb-5 flex flex-col items-center">
          <div className="border-2 border-white border-opacity-50 shadow rounded-full h-28 w-28 relative">
            <Image
              src={getImageUrl(auth.avatar.url) || defaultImage}
              alt="アイコン"
              className="object-cover rounded-full"
              fill
            />
          </div>
          <p className="text-xl font-bold pt-1 select-none pb-3">
            {auth.nickname}
          </p>
          <p className="text-xs bg-yellow-50 text-black rounded-full ml-2 px-6 py-1 shadow select-none">
            {"かけだし"}料理人
          </p>
          <div className="flex items-center p-1 text-xl select-none">
            <p className="font-bold mr-3">
              {followings.length}
              <span className="text-sm font-normal ml-0.5">フォロー中</span>
            </p>
            <p className="font-bold">
              {followers.length}
              <span className="text-sm font-normal ml-0.5">フォロワー</span>
            </p>
          </div>
        </div>
        <ul className="mx-3 mb-3 divide-y divide-gray-300">
          <li className="py-1 my-btn">
            <Link
              href={`/${auth.name}`}
              className="relative hover:text-blue-500 select-none"
              onClick={() => document.getElementById("accout-circle")?.click()}
            >
              <span className="material-icons">person</span>
              プロフィール
              <span className="absolute text-blue-500 w-full text-right material-icons transition-all duration-200 opacity-0 hover:opacity-100 hover:translate-x-1">
                navigate_next
              </span>
            </Link>
          </li>
          <li className="py-1 my-btn">
            <button
              className="relative hover:text-blue-500"
              onClick={() => {
                document.getElementById("accout-circle")?.click();
                logout();
                setToast({
                  message: "ログアウトしました",
                  case: "success",
                });
              }}
            >
              <span className="material-icons">logout</span>
              ログアウト
              <span className="absolute text-blue-500 w-full text-right material-icons transition-all duration-200 opacity-0 hover:opacity-100 hover:translate-x-1">
                navigate_next
              </span>
            </button>
          </li>
        </ul>
        <ul className="mx-3 text-xs flex items-center justify-center">
          <li className="text-blue-400 underline">
            <Link
              href="/terms"
              onClick={() => document.getElementById("accout-circle")?.click()}
            >
              ご利用規約
            </Link>
          </li>
          <li className="text-blue-400 underline">
            <Link
              href="/privacy"
              onClick={() => document.getElementById("accout-circle")?.click()}
            >
              プライバシーポリシー
            </Link>
          </li>
        </ul>
        <p className="mt-2 font-bold text-xs opacity-20 text-center select-none">
          © 2024 たまごかけごはん<span className="text-yellow-600">.</span>com
        </p>
      </section>
    </div>
  );
};
