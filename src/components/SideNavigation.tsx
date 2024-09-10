"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEditRecipe } from "@/hooks/useEditRecipe";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SideNavigation = () => {
  const pathName = usePathname();
  const { auth } = useAuth();
  const { create } = useEditRecipe();

  const handleCreateRecipe = () => {
    create();
  };

  return (
    <div className={`mt-16 w-full fixed md:block hidden`}>
      <ul>
        <li className="relative flex items-center my-3 bg-white rounded-l-md">
          <div
            className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
              pathName === "/recipes" ? "bg-yellow-500" : "bg-white"
            }`}
          />
          <Link
            href="/recipes"
            className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
              pathName === "/recipes"
                ? "text-yellow-600 font-bold text-xl shadow-md py-7"
                : "text-gray-400"
            }`}
          >
            <span className="material-icons mr-1">search</span>
            みつける
          </Link>
        </li>
        <li className="relative flex items-center my-3 bg-white rounded-l-md">
          <div
            className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
              pathName === `/${auth.name}` ? "bg-yellow-500" : "bg-white"
            }`}
          />
          <Link
            href={auth.isAuthenticated ? `/${auth.name}` : "/signin"}
            className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
              pathName === `/${auth.name}`
                ? "text-yellow-600 font-bold text-xl shadow-md py-7"
                : "text-gray-400"
            }`}
          >
            <span className="material-icons mr-1">
              {pathName === `/${auth.name}` ? "person" : "person_outline"}
            </span>
            プロフィール
          </Link>
        </li>
        <li className="relative flex items-center my-3 bg-white rounded-l-md">
          <div
            className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
              pathName === "/recipes/bookmark" ? "bg-yellow-500" : "bg-white"
            }`}
          />
          <Link
            href={auth.isAuthenticated ? "/recipes/bookmark" : "/signin"}
            className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
              pathName === "/recipes/bookmark"
                ? "text-yellow-600 font-bold text-xl shadow-md py-7"
                : "text-gray-400"
            }`}
          >
            <span className="material-icons mr-1">
              {pathName === "/recipes/bookmark"
                ? "bookmark"
                : "bookmark_outline"}
            </span>
            ブックマーク
          </Link>
        </li>
        <li className="relative flex items-center my-3 bg-white rounded-l-md">
          <div
            className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
              pathName === "/recipes/drafts" ? "bg-yellow-500" : "bg-white"
            }`}
          />
          <Link
            href={auth.isAuthenticated ? "/recipes/drafts" : "/signin"}
            className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
              pathName === "/recipes/drafts"
                ? "text-yellow-600 font-bold text-xl shadow-md py-7"
                : "text-gray-400"
            }`}
          >
            <span className="material-icons mr-1">edit_note</span>
            下書き
          </Link>
        </li>
        <li
          className={`my-8 bg-gradient text-xl text-white font-bold rounded-l-md transition-all duration-500 shadow-md hover:brightness-110 active:scale-[.98] active:shadow-none`}
        >
          <button
            className="p-5 py-7 flex items-center"
            onClick={handleCreateRecipe}
            disabled={pathName.includes("edit")}
          >
            <span className="material-icons mr-1">edit</span>
            レシピを書く
          </button>
        </li>
      </ul>
    </div>
  );
};
