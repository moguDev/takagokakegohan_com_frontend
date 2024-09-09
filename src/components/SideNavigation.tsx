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
        <li
          className={`flex items-center my-2 p-5 bg-white rounded-l-lg transition-all duration-500 ${
            pathName === "/recipes"
              ? "text-yellow-600 font-bold text-xl shadow-md"
              : "text-gray-400"
          }`}
        >
          <Link href="/recipes" className="flex items-center">
            <span className="material-icons mr-1">search</span>
            みつける
          </Link>
        </li>
        <li
          className={`my-2 p-5 bg-white rounded-l-lg transition-all duration-500 ${
            pathName === `/${auth.name}`
              ? "text-yellow-600 font-bold text-xl shadow-md"
              : "text-gray-400"
          }`}
        >
          <Link href={`/${auth.name}`} className="flex items-center">
            <span className="material-icons mr-1">
              {pathName === `/${auth.name}` ? "person" : "person_outline"}
            </span>
            プロフィール
          </Link>
        </li>
        <li
          className={`my-2 p-5 bg-white rounded-l-lg transition-all duration-500 ${
            pathName === "/recipes/bookmark"
              ? "text-yellow-600 font-bold text-xl shadow-md"
              : "text-gray-400"
          }`}
        >
          <Link href="/recipes/bookmark" className="flex items-center">
            <span className="material-icons mr-1">
              {pathName === "/recipes/bookmark"
                ? "bookmark"
                : "bookmark_outline"}
            </span>
            ブックマーク
          </Link>
        </li>
        <li
          className={`my-2 p-5 bg-white rounded-l-lg transition-all duration-500 ${
            pathName === "/recipes/drafts"
              ? "text-yellow-600 font-bold text-xl shadow-md"
              : "text-gray-400"
          }`}
        >
          <Link href="/recipes/drafts" className="flex items-center">
            <span className="material-icons mr-1">edit_note</span>
            下書き
          </Link>
        </li>
        <li
          className={`my-5 p-6 bg-gradient text-lg text-white font-bold rounded-l-lg transition-all duration-500 shadow-md`}
        >
          <button className="flex items-center" onClick={handleCreateRecipe}>
            <span className="material-icons mr-1">edit</span>
            レシピを書く
          </button>
        </li>
      </ul>
    </div>
  );
};
