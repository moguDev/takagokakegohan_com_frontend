"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";
import Link from "next/link";
import { useRef, useState } from "react";

export const RecipesPage = () => {
  const { recipes } = useRecipes();
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectIndex, setSelectIndex] = useState(0);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const handleClick = (index: number) => {
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

  return (
    <div className="w-full">
      <div className="bg-white w-full px-4 fixed top-16 pb-2 z-10 border-b border-gray-200">
        <div className="bg-gray-100 rounded-full border border-gray-200 flex items-center p-2 max-w-7xl mx-auto">
          <span className="material-icons text-gray-300">search</span>
          <input
            type="text"
            className="bg-gray-100 w-full outline-none"
            placeholder="食材や調味料で検索"
          />
        </div>
      </div>
      <section className="pt-16 max-w-7xl mx-auto">
        <div
          ref={navContainerRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide mb-3"
        >
          <nav className="flex">
            {[
              "#新着レシピ",
              "#注目のレシピ",
              "#爆速レシピ",
              "#殿堂入りレシピ",
              "#フォロー中",
              "#卵でさがす",
              "#調味料でさがす",
              "#ブックマーク",
            ].map((item, index) => (
              <Link
                key={index}
                href="#"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleClick(index)}
                className={`nav-item mx-1 px-4 py-1 text-sm rounded-full transition-all duration-400 ${
                  index === selectIndex
                    ? "font-semibold text-white bg-yellow-600"
                    : "text-gray-600"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>
        <section className="px-1">
          <h2
            className={`mx-2 flex items-center text-black text-base font-bold`}
          >
            <span className="material-icons text-yellow-600 mr-2">
              new_releases
            </span>
            注目のたまごかけごはん
          </h2>
          <div className="grid lg:grid-cols-6 grid-cols-2 p-2">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
          <h2
            className={`mx-2 flex items-center text-black text-base font-bold`}
          >
            <span className="rounded bg-red-600 text-white text-xs p-1 mr-2">
              NEW
            </span>
            新着のたまごかけごはん
          </h2>
          <div className="grid lg:grid-cols-6 grid-cols-2 p-2">
            {recipes.map((recipe, index) => (
              <RecipeCard key={index} recipe={recipe} />
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};
