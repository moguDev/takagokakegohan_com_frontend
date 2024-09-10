"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Loading from "../loading";
import { atom, useRecoilState, useSetRecoilState } from "recoil";
import { useAuth } from "@/hooks/useAuth";
import { toastState } from "@/components/Toast";

const items: string[] = [
  "#新着TKG",
  "#注目TKG",
  "#爆速TKG",
  "#殿堂入りTKG",
  "#フォロー中",
];

const heads = [
  <>
    <span className="rounded bg-red-600 text-white text-xs p-1 mr-1">NEW</span>
    新着のたまごかけごはん
  </>,
  <>
    <span className="material-icons text-yellow-600 mr-1">new_releases</span>
    注目のたまごかけごはん
  </>,
  <>
    <span className="material-icons text-yellow-600 mr-1">flash_on</span>
    爆速たまごかけごはん
  </>,
  <>
    <span className="material-icons text-yellow-600 mr-1">emoji_events</span>
    殿堂入りたまごかけごはん
  </>,
  <>
    <span className="material-icons text-yellow-600 mr-1">group</span>
    フォロー中
  </>,
];

const selectIndexState = atom<number>({ key: "selectIndexState", default: 0 });

export const RecipesPage = () => {
  const { auth } = useAuth();
  const setMessage = useSetRecoilState(toastState);
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectIndex, setSelectIndex] =
    useRecoilState<number>(selectIndexState);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { recipes, loading, fetch } = useRecipes();

  const handleClick = (index: number) => {
    if (!auth.isAuthenticated && items[index] === "#フォロー中") {
      setMessage("ログインしてください。");
      return;
    }
    setSelectIndex(index);
    const ref = itemRefs.current[index];
    if (ref) {
      ref.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  useEffect(() => {
    switch (items[selectIndex]) {
      case "#新着TKG":
        fetch("new");
        break;
      case "#注目のTKG":
        fetch("highlight");
        break;
      case "#爆速TKG":
        fetch();
        break;
      case "#殿堂入りTKG":
        fetch();
        break;
      case "#フォロー中":
        if (auth.isAuthenticated) fetch("following");
        break;
      default:
        fetch();
        break;
    }
  }, [selectIndex, fetch]);

  return (
    <div className="w-full">
      <div className="bg-white w-full px-4 fixed top-16 pb-3 z-10 flex border-b border-gray-200">
        <div className="bg-gray-50 rounded-full border border-gray-200 shadow-sm flex items-center p-2 w-full">
          <span className="material-icons text-gray-300">search</span>
          <input
            type="text"
            className="bg-gray-50 w-full outline-none"
            placeholder="食材や調味料で検索"
          />
        </div>
        <div className="md:w-80" />
      </div>
      <section className="lg:pt-6 pt-10 max-w-7xl mx-auto translate-y-2">
        <div
          ref={navContainerRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <nav className="flex items-center md:mx-4 mx-2">
            {items.map((item, index) => (
              <Link
                key={index}
                href="#"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => !loading && handleClick(index)}
                className={`relative nav-item pt-3 pb-5 rounded-t-lg transition-all duration-400 ${
                  index === selectIndex
                    ? "font-semibold text-yellow-600 bg-white text-base px-12"
                    : "text-gray-500 text-sm px-4"
                }`}
              >
                <div
                  className={`absolute top-0 left-0 h-1 w-full ${
                    index === selectIndex ? "bg-yellow-500" : "bg-opacity-0"
                  } rounded-t-lg`}
                />
                {item}
              </Link>
            ))}
          </nav>
        </div>
      </section>
      <div className="md:px-4 px-2">
        <section className="relative bg-white rounded-lg max-w-7xl mx-auto md:p-5 p-2">
          <div className="flex items-center justify-between p-2 pb-3">
            <h2 className="flex items-center text-black md:text-xl text-base font-bold">
              {heads[selectIndex]}
            </h2>
            <p className="text-gray-500 font-semibold">{recipes.length}件</p>
          </div>
          {recipes.length > 0 ? (
            <div className="relative grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
              {loading && (
                <div className="absolute flex flex-col items-center justify-center h-full w-full bg-white bg-opacity-30 z-10">
                  <span className="loading loading-dots loading-lg text-yellow-500" />
                  <p className="text-xs text-gray-500 font-semibold">
                    読み込み中
                  </p>
                </div>
              )}
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="p-5 min-h-64 flex items-center justify-center">
              <p className="text-center text-gray-400">
                レシピが見つかりませんでした。
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
