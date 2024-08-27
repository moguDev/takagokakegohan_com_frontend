"use client";
import { Hero } from "@/components/Hero";
import { Sawarabi_Mincho } from "next/font/google";
import { LoginModal } from "@/components/LoginModal";
import sampleImage from "/public/images/bg_photo_tkg.png";
import { RecipesCarousel } from "@/components/RecipesCarousel";
import useAuth from "@/hooks/useAuth";

const sawarabiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

const recipes = [
  {
    thumbnail: sampleImage,
    name: "たまごかけごはん1",
  },
  {
    thumbnail: sampleImage,
    name: "たまごかけごはん2",
  },
  {
    thumbnail: sampleImage,
    name: "たまごかけごはん3",
  },
  {
    thumbnail: sampleImage,
    name: "たまごかけごはん4",
  },
  {
    thumbnail: sampleImage,
    name: "たまごかけごはん5",
  },
];

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center bottom-0 -mb-6 z-40 w-full">
        <div className="flex items-center bg-white rounded border-2 border-theme lg:w-1/2 w-full mx-2">
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
  const { isAuthenticated, login, signup } = useAuth();
  const recipes = [
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
    { title: "たまごかけごはん" },
  ];

  return (
    <div>
      <Hero />
      <SearchBar />
      <div
        className={`pt-5 p-3 ${sawarabiMincho.className} divide-y divide-black divide-opacity-20`}
      >
        <div className="py-5">
          <h2
            className={`mx-3 my-1 flex items-center text-2xl font-bold ${sawarabiMincho.className}`}
          >
            <span className="material-icons text-yellow-600 mr-2">
              new_releases
            </span>
            注目のレシピ
          </h2>
          <RecipesCarousel recipes={recipes} />
        </div>
        <div className="py-5">
          <h2
            className={`mx-3 my-1 flex items-center text-2xl font-bold ${sawarabiMincho.className}`}
          >
            <span className="rounded bg-red-600 text-white text-xs p-1 mr-2">
              NEW
            </span>
            新着のレシピ
          </h2>
          <RecipesCarousel recipes={recipes} />
        </div>
      </div>
      <LoginModal handleLogin={login} />
    </div>
  );
}
