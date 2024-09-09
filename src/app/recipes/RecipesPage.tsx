"use client";
import { RecipeCard } from "@/components/RecipeCard";
import { useRecipes } from "@/hooks/useRecipes";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

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

export const RecipesPage = () => {
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectIndex, setSelectIndex] = useState(0);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const { recipes, fetch } = useRecipes();

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

  useEffect(() => {
    switch (items[selectIndex]) {
      case "#新着TKG":
        fetch("new");
        break;
      case "#注目のTKG":
        fetch("highlight");
        break;
      case "#爆速TKG":
      case "#殿堂入りTKG":
      case "#フォロー中":
      default:
        fetch();
        break;
    }
  }, [selectIndex, fetch]);

  return (
    <div className="w-full">
      <div className="bg-white w-full px-4 fixed top-16 pb-2 z-10 border-b border-gray-200">
        <div className="bg-gray-50 rounded-full border border-gray-300 flex items-center p-2 max-w-7xl mx-auto">
          <span className="material-icons text-gray-300">search</span>
          <input
            type="text"
            className="bg-gray-50 w-full outline-none"
            placeholder="食材や調味料で検索"
          />
        </div>
      </div>
      <section className="pt-12 md:mb-6 mb-3 max-w-7xl mx-auto">
        <div
          ref={navContainerRef}
          className="overflow-x-auto whitespace-nowrap scrollbar-hide"
        >
          <nav className="flex">
            {items.map((item, index) => (
              <Link
                key={index}
                href="#"
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                onClick={() => handleClick(index)}
                className={`nav-item mx-1 px-4 py-1 md:text-base text-sm rounded-lg transition-all duration-400 ${
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
      </section>
      <div className="md:px-4 px-2">
        <section className="bg-white rounded-lg max-w-7xl mx-auto md:p-5 p-2">
          <section>
            <h2
              className={`p-2 pb-3 flex items-center text-black md:text-xl text-base font-bold`}
            >
              {heads[selectIndex]}
            </h2>
            <div className="grid md:grid-cols-4 grid-cols-2">
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          </section>
        </section>
      </div>
    </div>
  );
};
