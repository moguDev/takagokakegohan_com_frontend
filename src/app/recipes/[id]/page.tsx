"use client";
import Image from "next/image";
import sampleImage from "/public/images/bg_photo_tkg.png";
import { Sawarabi_Mincho } from "next/font/google";
import { useState } from "react";

const sawarabiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

type RecipeData = {
  id: 1;
  title: string;
  body: string;
  chef: string;
  cooking_time: number;
  ingredients: { ingredient: string; amount: string; category: string }[];
};

const RecipeDetailPage: React.FC = () => {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const data: RecipeData = {
    id: 1,
    title: "たまごかけごはん",
    body: "普通のたまごかけごはんです。めんつゆの風味が非常にマッチして美味しいです。",
    chef: "もぐ",
    cooking_time: 60,
    ingredients: [
      { ingredient: "卵", amount: "1個", category: "卵" },
      { ingredient: "白ごはん", amount: "お茶碗1杯", category: "ごはん" },
      { ingredient: "めんつゆ", amount: "大さじ1", category: "調味料" },
    ],
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div
      className={`max-w-7xl mx-auto pt-24 lg:pb-5 lg:pr-1 px-5 ${sawarabiMincho.className}`}
    >
      <section className="bg-white p-5 shadow lg:flex w-full h-full">
        <Image
          src={sampleImage}
          alt="sample"
          className="h-96 w-96 object-cover mx-auto"
        />
        <div className="lg:px-5 w-full h-auto">
          <div className="mb-4">
            <div className="flex items-end justify-between">
              <h1 className="lg:text-4xl text-2xl pt-2">{data.title}</h1>
              <p className="text-xs">
                調理時間{" "}
                <span className="text-lg font-semibold">
                  {data.cooking_time}
                </span>{" "}
                秒
              </p>
            </div>
            <p className="p-1">{data.chef}</p>
            <div className="flex items-center p-1">
              {4.1}
              <div className="rating">
                <input className="mask mask-star-2 bg-orange-400" />
                <input className="mask mask-star-2 bg-orange-400" />
                <input className="mask mask-star-2 bg-orange-400" />
                <input
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input className="mask mask-star-2 bg-orange-400" />
              </div>
            </div>
            <p className="p-1 text-sm">{data.body}</p>
          </div>
          <div className="bg-gray-50 rounded p-2 ">
            <h2 className="text-xl text-gray-600 font-semibold">
              材料<span className="text-sm">（1人前）</span>
            </h2>
            <div className="p-1 divide-y divide-gray-200">
              {data.ingredients.map((item, index) => (
                <p key={index} className="my-auto py-2">
                  <span className="font-semibold">{item.ingredient}</span>
                  <span className="ml-2">{item.amount}</span>
                </p>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-end py-3">
            <button className=" text-black rounded p-1 flex items-center mr-1 my-btn">
              <span className="material-icons mr-1"></span>
            </button>
            <button
              className="text-black rounded p-2 flex items-center  my-btn"
              onClick={handleCopyLink}
            >
              <span className="material-icons mr-0.5 my-auto">link</span>
            </button>
            <button
              className={"rounded p-1 flex items-center my-btn"}
              onClick={() => setBookmarked((prev) => !prev)}
            >
              <p className="flex items-center">
                <span
                  className={`material-icons mr-0.5 my-auto ${
                    bookmarked ? "text-yellow-600" : "text-black"
                  }`}
                >
                  {`${bookmarked ? "bookmark" : "bookmark_outline"}`}
                </span>
                {0}
              </p>
            </button>
          </div>
        </div>
      </section>
      <section className="mt-2 p-5 bg-white shadow">
        <div className="flex items-end justify-between pb-2 border-b border-black">
          <h2 className="lg:text-2xl text-xl">{data.title}の作り方</h2>
          <p className="text-sm">{data.cooking_time}秒</p>
        </div>
        <section className="divide-y divide-gray-200">
          <div className="flex items-start py-3 text-sm">
            <p className="pr-2">{1}.</p>
            <p>{"適当な器に卵を割り入れます。"}</p>
          </div>
          <div className="flex items-start py-3 text-sm">
            <p className="pr-2">{2}.</p>
            <p>{"めんつゆを加え、よく混ぜます。"}</p>
          </div>
          <div className="flex items-start py-3 text-sm">
            <p className="pr-2">{3}.</p>
            <p>{"溢れないように白ごはんに流し入れ、よく混ぜます。"}</p>
          </div>
          <div className="flex items-start py-3 text-sm">
            <p className="pr-2">{4}.</p>
            <p>{"できあがり。"}</p>
          </div>
        </section>
      </section>
      <section>
        <h2 className="mt-8 mb-2 p-1 text-sm border-b border-black">
          レビュー
        </h2>
        <div className="grid lg:grid-cols-3">
          <div className="bg-white shadow p-5">
            <div className="flex items-center justify-between border-b border-black py-2">
              <p className="flex items-center mr-0.5">
                <span className="material-icons">account_circle</span>
                {"なまえ"}
              </p>
              <div className="rating scale-75">
                <input className="mask mask-star-2 bg-orange-400" />
                <input className="mask mask-star-2 bg-orange-400" />
                <input className="mask mask-star-2 bg-orange-400" />
                <input
                  className="mask mask-star-2 bg-orange-400"
                  defaultChecked
                />
                <input className="mask mask-star-2 bg-orange-400" />
              </div>
            </div>
            <p className="py-2 text-sm">美味しかったです。</p>
            <p className="text-right text-gray-400 text-xs">2024年8月28日</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecipeDetailPage;
