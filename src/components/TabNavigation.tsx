"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const TabNavigation = () => {
  const { auth } = useAuth();
  const pathName = usePathname();

  return (
    <div
      className={`max-w-2xl mx-auto pb-2 ${
        (pathName === "/" ||
          pathName === "/signup" ||
          pathName === "/recipes/new" ||
          /^\/recipes\/\d+$/.test(pathName)) &&
        "hidden"
      }`}
    >
      <div
        className={`
        flex items-center justify-between md:rounded-full shadow
        text-gray-400 bg-white bg-opacity-75 backdrop-blur-xl
        md:mb-2 md:border border-t border-gray-100 max-w-2xl w-full h-16 py-3
        fixed bottom-0 z-40`}
      >
        <Link
          href="/recipes"
          className={`material-icons w-1/2 text-center transition-all duration-300 select-none ${
            pathName.includes("/recipes")
              ? "text-yellow-950 font-semibold scale-100"
              : "scale-90"
          }`}
        >
          search
          <p className="text-xs font-bold">みつける</p>
        </Link>

        <div className="relative w-1/3 flex justify-center">
          <Link
            href="/recipes/new"
            className="absolute flex flex-col items-center justify-center rounded-full h-24 w-24 bg-gradient shadow my-btn select-none -bottom-6"
          >
            <span className="material-icons text-white text-opacity-80 mb-1 scale-150 select-none">
              edit_note
            </span>
            <p className="text-xs font-semibold text-white select-none">
              レシピを書く
            </p>
          </Link>
        </div>

        <Link
          href={auth.isAuthenticated ? `/${auth.name}` : `/signin`}
          className={`material-icons w-1/2 text-center transition-all duration-300 select-none ${
            pathName.includes(auth.isAuthenticated ? `/${auth.name}` : `/sign`)
              ? "text-black font-semibold scale-100"
              : "scale-90"
          }`}
        >
          {pathName.includes(auth.isAuthenticated ? `/${auth.name}` : `/sign`)
            ? "person"
            : "person_outline"}
          <p className="text-xs font-bold">プロフィール</p>
        </Link>
      </div>
    </div>
  );
};
