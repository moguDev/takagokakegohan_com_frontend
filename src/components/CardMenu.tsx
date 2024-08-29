"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

export const CardMenu: React.FC = () => {
  const { auth, logout } = useAuth();
  return (
    <div
      tabIndex={0}
      className="dropdown-content menu bg-gradient-02 w-80 mx-auto rounded-lg z-[1] mt-7 shadow-2xl"
    >
      <section className="menu min-h-full pt-8 pb-3 px-3 rounded-l">
        {auth.isAuthenticated ? (
          <>
            <div className="mb-5 flex flex-col items-center">
              <p className="text-3xl font-bold py-3">{auth.name}</p>
              <p className="text-xs bg-gradient text-white rounded-full ml-2 px-6 py-0.5 shadow">
                {"三つ星 ★★★"}
              </p>
              <div className="flex items-center p-1 text-xl">
                <p className="font-bold mr-3">
                  {0}
                  <span className="text-sm font-normal ml-1">フォロー</span>
                </p>
                <p className="font-bold">
                  {0}
                  <span className="text-sm font-normal ml-1">フォロワー</span>
                </p>
              </div>
            </div>
            <Link
              href="#"
              className="flex items-center justify-center rounded bg-yellow-600 shadow font-bold text-white mx-3 py-3 my-btn cursor-pointer mb-5"
            >
              <span className="material-icons">create</span>
              レシピを投稿する
            </Link>
            <ul className="mb-3 divide-y divide-gray-300">
              <li className="py-1 my-btn">
                <Link href="#" className="relative hover:text-blue-500">
                  <span className="material-icons">person</span>
                  マイページ
                  <span className="absolute text-blue-500 w-full text-right material-icons transition-all duration-200 opacity-0 hover:opacity-100 hover:translate-x-1">
                    navigate_next
                  </span>
                </Link>
              </li>
              <li className="py-1 my-btn">
                <Link href="#" className="relative hover:text-blue-500">
                  <span className="material-icons">bookmark</span>
                  ブックマーク
                  <span className="absolute text-blue-500 w-full text-right material-icons transition-all duration-200 opacity-0 hover:opacity-100 hover:translate-x-1">
                    navigate_next
                  </span>
                </Link>
              </li>
              <li className="py-1 my-btn">
                <button
                  className="relative hover:text-blue-500"
                  onClick={() => {
                    logout();
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
          </>
        ) : (
          <>
            <label
              htmlFor="login-modal"
              className="flex items-center justify-center rounded bg-yellow-700 shadow font-bold text-white py-3 my-btn cursor-pointer mb-3"
            >
              <span className="material-icons mr-1">login</span>
              ログイン
            </label>
            <Link
              href="/signup"
              className="flex items-center justify-center rounded bg-white border font-bold text-black py-3 my-btn cursor-pointer mb-3"
            >
              <span className="material-icons mr-1">person_add</span>
              アカウント作成
            </Link>
          </>
        )}
        <p className="pt-8 font-bold text-xs opacity-20 text-center">
          たまごかけごはん<span className="text-yellow-600">.</span>com
        </p>
      </section>
    </div>
  );
};
