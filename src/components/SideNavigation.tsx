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
    <div className="relative h-screen">
      <div className="fixed top-0 pt-32 border-l border-gray-200 h-screen w-80">
        <ul className="text-gray-400">
          <li>
            <Link
              href="/recipes"
              className={`p-5 flex items-center text-center transition-all duration-300 select-none ${
                pathName.includes("/recipes") &&
                "text-blue-800 font-semibold bg-blue-50"
              }`}
            >
              <span className="material-icons mr-1">search</span>みつける
            </Link>
          </li>
          <li>
            <Link
              href={auth.isAuthenticated ? `/${auth.name}` : `/signin`}
              className={`p-5 flex items-center text-center transition-all duration-300 select-none ${
                pathName.includes(
                  auth.isAuthenticated ? `/${auth.name}` : `/sign`
                ) && "text-blue-800 font-semibold bg-blue-50"
              }`}
            >
              <span className="material-icons mr-1">
                {pathName.includes(
                  auth.isAuthenticated ? `/${auth.name}` : `/sign`
                )
                  ? "person"
                  : "person_outline"}
              </span>
              プロフィール
            </Link>
          </li>
          <li>
            <Link
              href="/drafts"
              className={`p-5 flex items-center text-center transition-all duration-300 select-none ${
                pathName === "/drafts" &&
                "text-blue-800 font-semibold bg-blue-50"
              }`}
            >
              <span className="material-icons mr-1">edit</span>
              下書きレシピ
            </Link>
          </li>
          <li>
            <Link
              href="/bookmarks"
              className={`p-5 flex items-center text-center transition-all duration-300 select-none ${
                pathName === "/bookmarks" &&
                "text-blue-800 font-semibold bg-blue-50"
              }`}
            >
              <span className="material-icons mr-1">bookmark</span>
              ブックマーク
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};
