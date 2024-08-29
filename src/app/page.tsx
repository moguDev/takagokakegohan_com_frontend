"use client";
import { Hero } from "@/components/Hero";
import { Sawarabi_Mincho } from "next/font/google";
import { RecipesCarousel } from "@/components/RecipesCarousel";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState } from "react";

const sawarabiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

const SearchBar: React.FC = () => {
  return (
    <div className={`${"relative"}`}>
      <div className="absolute flex items-end justify-center bottom-0 -mb-6 z-30 w-full">
        <div className="flex items-center bg-white rounded border-2 border-theme lg:w-1/2 w-full mx-2 shadow">
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
  const { checkAuth } = useAuth();
  const recipes = [
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
  ];

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <Hero />
      <SearchBar />
      <div
        className={`pt-5 ${sawarabiMincho.className} divide-y divide-black divide-opacity-10`}
      >
        <div className="py-5">
          <h2 className={`mx-5 my-1 flex items-center text-2xl font-bold`}>
            <span className="material-icons text-yellow-600 mr-2">
              new_releases
            </span>
            注目のたまごかけごはん
          </h2>
          <RecipesCarousel recipes={recipes} />
        </div>
        <div className="py-5">
          <h2 className={`mx-5 my-1 flex items-center text-2xl font-bold`}>
            <span className="rounded bg-red-600 text-white text-xs p-1 mr-2">
              NEW
            </span>
            新着のたまごかけごはん
          </h2>
          <RecipesCarousel recipes={recipes} />
        </div>
      </div>
    </>
  );
}
