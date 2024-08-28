"use client";
import { Hero } from "@/components/Hero";
import { Sawarabi_Mincho } from "next/font/google";
import { RecipesCarousel } from "@/components/RecipesCarousel";
import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { LoginModal } from "@/components/LoginModal";
import Link from "next/link";

const sawarabiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute flex items-end justify-center bottom-0 -mb-6 z-40 w-full">
        <div className="flex items-center bg-white rounded border-2 border-theme lg:w-1/2 w-full mx-2">
          <span className="material-icons opacity-30 pl-3 pr-1">search</span>
          <input
            type="text"
            placeholder="レシピ名や調味料で検索"
            className="outline-none py-3 w-full"
          />
          <button className="bg-yellow-600 h-full w-28 text-white rounded px-3 py-2 m-0.5 active:scale-95 transition-all duration-300">
            検索
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { auth, checkAuth, logout } = useAuth();
  const recipes = [
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
  ];

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <Hero />
        <SearchBar />
        <div
          className={`pt-5 p-3 ${sawarabiMincho.className} divide-y divide-black divide-opacity-20`}
        >
          <div className="py-5">
            <h2 className={`mx-3 my-1 flex items-center text-2xl font-bold`}>
              <span className="material-icons text-yellow-600 mr-2">
                new_releases
              </span>
              注目のたまごかけごはん
            </h2>
            <RecipesCarousel recipes={recipes} />
          </div>
          <div className="py-5">
            <h2 className={`mx-3 my-1 flex items-center text-2xl font-bold`}>
              <span className="rounded bg-red-600 text-white text-xs p-1 mr-2">
                NEW
              </span>
              新着のたまごかけごはん
            </h2>
            <RecipesCarousel recipes={recipes} />
          </div>
        </div>
      </div>
      <div className="drawer-side z-50">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        />
        <section className="menu bg-white bg-opacity-90 backdrop-blur  min-h-full md:w-96 w-80 pt-10 p-5 rounded-l">
          {auth.isAuthenticated ? (
            <>
              <div className="mb-5">
                <span className="material-icons scale-150 px-3">
                  account_circle
                </span>
                <div>
                  <div className="flex items-end">
                    <p className="text-2xl p-1 font-bold">{auth.name}</p>
                    <p className="p-1 font-semibold">Lv.{1}</p>
                  </div>
                  <div className="flex items-center p-1 text-xl">
                    <p className="font-bold mr-3">
                      {0}
                      <span className="text-sm font-normal ml-1">フォロー</span>
                    </p>
                    <p className="font-bold">
                      {0}
                      <span className="text-sm font-normal ml-1">
                        フォロワー
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <Link
                href="#"
                className="flex items-center justify-center rounded bg-yellow-600 shadow font-bold text-white py-3 my-btn cursor-pointer mb-3"
              >
                <span className="material-icons">add</span>
                レシピを投稿する
              </Link>
              <ul className="mb-3 divide-y divide-gray-300">
                <li className="py-1 my-btn">
                  <label htmlFor="my-drawer-4">
                    <span className="material-icons">person</span>
                    マイページ
                  </label>
                </li>
                <li className="py-1 my-btn">
                  <label htmlFor="my-drawer-4">
                    <span className="material-icons">bookmark</span>
                    ブックマーク
                  </label>
                </li>
                <li className="py-1 my-btn">
                  <label
                    htmlFor="my-drawer-4"
                    onClick={() => {
                      logout();
                    }}
                  >
                    <span className="material-icons">logout</span>
                    ログアウト
                  </label>
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
          <ul className="mb-3 py-5">
            <li className="py-1 hover:underline">
              <Link href="#">利用規約</Link>
            </li>
            <li className="py-1 hover:underline">
              <Link href="#">プライバシーポリシー</Link>
            </li>
          </ul>
        </section>
      </div>
      <LoginModal />
    </div>
  );
}
