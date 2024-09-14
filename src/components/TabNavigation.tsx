"use client";
import Loading from "@/app/loading";
import { useAuth } from "@/hooks/useAuth";
import { useEditRecipe } from "@/hooks/useEditRecipe";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { toastState } from "./Toast";

export const TabNavigation = () => {
  const setToast = useSetRecoilState(toastState);
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
    auth.isAuthenticated
      ? create()
      : setToast({ message: "ログインしてください", case: "alert" });
  };

  return (
    <div
      className={`max-w-2xl mx-auto pb-2 ${
        (pathName === "/signup" ||
          pathName === "/recipes/new" ||
          /^\/recipes\/(\d+)\/edit$/.test(pathName) ||
          /^\/recipes\/\d+$/.test(pathName)) &&
        "hidden"
      }`}
    >
      <div
        className={`
        flex items-center justify-between md:rounded-full shadow
        text-gray-400 bg-white bg-opacity-80 backdrop-blur
        md:mb-2 md:border border-t border-gray-200 max-w-2xl w-full h-[70px] pt-4 pb-5 px-2
        fixed bottom-0 z-40 transition-all duration-500 ease-in-out ${
          !isVisible && "translate-y-32"
        }`}
      >
        <Link
          href="/"
          className={`w-1/4 text-center transition-all duration-300 select-none ${
            pathName === "/"
              ? "text-yellow-600 font-semibold scale-125"
              : "scale-100"
          }`}
        >
          <span className="material-icons">search</span>
        </Link>
        <Link
          href={auth.isAuthenticated ? "/bookmark" : "/signin"}
          onClick={() => {
            !auth.isAuthenticated &&
              setToast({ message: "ログインしてください", case: "alert" });
          }}
          className={`w-1/4 text-center transition-all duration-300 select-none ${
            pathName === "/bookmark"
              ? "text-yellow-600 font-semibold scale-125"
              : "scale-100"
          }`}
        >
          <span className="material-icons">
            {pathName === "/bookmark" ? "bookmark" : "bookmark_outline"}
          </span>
        </Link>
        <div className="relative w-1/4 flex justify-center">
          <button
            onClick={handleCreateRecipe}
            className="absolute flex flex-col items-center justify-center rounded-full h-20 w-20 bg-gradient shadow my-btn select-none -bottom-7"
          >
            <span
              className="material-icons text-white text-opacity-80 mb-1 select-none"
              style={{ fontSize: "32px" }}
            >
              edit
            </span>
            <p
              className="font-semibold text-white select-none"
              style={{ fontSize: "8px" }}
            >
              レシピを書く
            </p>
          </button>
        </div>
        <Link
          href={auth.isAuthenticated ? "/drafts" : "/signin"}
          onClick={() => {
            !auth.isAuthenticated &&
              setToast({ message: "ログインしてください", case: "alert" });
          }}
          className={`w-1/4 text-center transition-all duration-300 select-none ${
            pathName === "/drafts"
              ? "text-yellow-600 font-semibold scale-125"
              : "scale-100"
          }`}
        >
          <span className="material-icons">edit_note</span>
        </Link>
        <Link
          href={auth.isAuthenticated ? `/${auth.name}` : `/signin`}
          className={`w-1/4 text-center transition-all duration-300 select-none ${
            pathName.includes(auth.isAuthenticated ? `/${auth.name}` : `/sign`)
              ? "text-yellow-600 font-semibold scale-125"
              : "scale-100"
          }`}
        >
          <span className="material-icons">
            {pathName.includes(auth.isAuthenticated ? `/${auth.name}` : `/sign`)
              ? "person"
              : "person_outline"}
          </span>
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
