"use client";
import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { useEditRecipe } from "@/hooks/useEditRecipe";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const TabNavigation = () => {
  const { auth } = useAuth();
  const pathName = usePathname();
  const { create, loading } = useEditRecipe();
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleCreateRecipe = () => {
    create();
  };

  return (
    <div
      className={`max-w-2xl mx-auto pb-2 ${
        (pathName === "/signup" ||
          pathName === "/recipes/new" ||
          /^\/recipes\/(\d+)\/edit$/.test(pathName) ||
          /^\/recipes\/\d+$/.test(pathName)) &&
        "hidden"
      } ${!isVisible && "h-0 hidden"}`}
    >
      <div
        className={`
        flex items-center justify-between md:rounded-full shadow
        text-gray-400 bg-white bg-opacity-80 backdrop-blur
        md:mb-2 md:border border-t border-gray-200 max-w-2xl w-full h-[70px] pt-4 pb-6 px-2
        fixed bottom-0 z-40`}
      >
        <Link
          href="/"
          className={`w-1/2 text-center transition-all duration-300 select-none ${
            pathName === "/"
              ? "text-yellow-600 font-semibold scale-100"
              : "scale-90"
          }`}
        >
          <span className="material-icons">search</span>
          <p className="text-xs font-bold">さがす</p>
        </Link>

        <div className="relative w-1/3 flex justify-center">
          <button
            onClick={handleCreateRecipe}
            className="absolute flex flex-col items-center justify-center rounded-full h-24 w-24 bg-gradient shadow my-btn select-none -bottom-8"
          >
            <span className="material-icons text-white text-opacity-80 mb-2 scale-110 select-none">
              edit
            </span>
            <p className="text-xs font-semibold text-white select-none">
              レシピを書く
            </p>
          </button>
        </div>

        <Link
          href={auth.isAuthenticated ? `/${auth.name}` : `/signin`}
          className={`w-1/2 text-center transition-all duration-300 select-none ${
            pathName.includes(auth.isAuthenticated ? `/${auth.name}` : `/sign`)
              ? "text-yellow-600 font-semibold scale-100"
              : "scale-90"
          }`}
        >
          <span className="material-icons">
            {pathName.includes(auth.isAuthenticated ? `/${auth.name}` : `/sign`)
              ? "person"
              : "person_outline"}
          </span>
          <p className="text-xs font-bold">プロフィール</p>
        </Link>
      </div>
      {loading && (
        <div className="fixed top-0 h-full w-full z-10 opacity-90">
          <Loading />
        </div>
      )}
    </div>
  );
};
