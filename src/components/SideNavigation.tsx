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
    <ul className="w-full fixed md:block hidden">
      <li className="relative flex items-center mb-3 bg-white rounded-l-md">
        <div
          className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
            pathName === "/" ? "bg-yellow-500 -translate-x-1" : "bg-white"
          }`}
        />
        <Link
          href="/"
          className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
            pathName === "/"
              ? "text-yellow-600 font-bold text-xl shadow-md py-7 -translate-x-1"
              : "text-gray-400"
          }`}
        >
          <span className="material-icons mr-1">search</span>
          レシピをさがす
        </Link>
      </li>
      <li className="relative flex items-center my-3 bg-white rounded-l-md">
        <div
          className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
            pathName === "/recipes/bookmark"
              ? "bg-yellow-500 -translate-x-1"
              : "bg-white"
          }`}
        />
        <Link
          href={auth.isAuthenticated ? "/recipes/bookmark" : "/signin"}
          className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
            pathName === "/recipes/bookmark"
              ? "text-yellow-600 font-bold text-xl shadow-md py-7 -translate-x-1"
              : "text-gray-400"
          }`}
        >
          <span className="material-icons mr-1">
            {pathName === "/recipes/bookmark" ? "bookmark" : "bookmark_outline"}
          </span>
          ブックマーク
        </Link>
      </li>
      <li className="relative flex items-center my-3 bg-white rounded-l-md">
        <div
          className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
            pathName === "/recipes/drafts"
              ? "bg-yellow-500 -translate-x-1"
              : "bg-white"
          }`}
        />
        <Link
          href={auth.isAuthenticated ? "/recipes/drafts" : "/signin"}
          className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
            pathName === "/recipes/drafts"
              ? "text-yellow-600 font-bold text-xl shadow-md py-7 -translate-x-1"
              : "text-gray-400"
          }`}
        >
          <span className="material-icons mr-1">edit_note</span>
          下書き
        </Link>
      </li>
      <li className="relative flex items-center my-3 bg-white rounded-l-md">
        <div
          className={`absolute h-full left-0 w-1 rounded-l-md transition-all duration-200 ${
            auth.isAuthenticated && pathName === `/${auth.name}`
              ? "bg-yellow-500 -translate-x-1"
              : "bg-white"
          }`}
        />
        <Link
          href={auth.isAuthenticated ? `/${auth.name}` : "/signin"}
          className={`flex items-center select-none w-full p-5 transition-all duration-200 ${
            auth.isAuthenticated && pathName === `/${auth.name}`
              ? "text-yellow-600 font-bold text-xl shadow-md py-7 -translate-x-1"
              : "text-gray-400"
          }`}
        >
          <span className="material-icons mr-1">
            {auth.isAuthenticated && pathName === `/${auth.name}`
              ? "person"
              : "person_outline"}
          </span>
          プロフィール
        </Link>
      </li>
      <li
        className={`mt-4 bg-gradient text-lg text-white font-bold rounded-l-md transition-all duration-500 shadow-md hover:brightness-110 active:shadow-none`}
      >
        <button
          className="p-5 py-7 flex items-center"
          onClick={handleCreateRecipe}
          disabled={pathName.includes("edit")}
        >
          <span className="material-icons mr-1">edit</span>
          新しいレシピを書く
        </button>
      </li>
    </ul>
  );
};
