"use client";
import { Card } from "@/components/Card";
import { Hero } from "@/components/Hero";
import { axiosInstance } from "@/lib/axiosInstance";
import { useEffect } from "react";
import { Sawarabi_Mincho } from "next/font/google";
import { LoginModal } from "@/components/LoginModal";

const shipporiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

const checkStatus: () => Promise<void> = async () => {
  try {
    const res = await axiosInstance.get("status");
    console.log(res);
  } catch (error) {
    console.log(`error: ${error}`);
  }
};

const SearchBar: React.FC = () => {
  return (
    <div className="relative">
      <div className="absolute flex items-center justify-center bottom-0 -mb-6 z-40 w-full">
        <div className="flex items-center bg-white rounded border-2 border-theme lg:w-1/2 w-full mx-2">
          <span className="material-icons opacity-30 pl-3 pr-1">search</span>
          <input
            type="text"
            placeholder="レシピ名や食材で検索"
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
  useEffect(() => {
    checkStatus();
  }, []);
  return (
    <div>
      <Hero />
      <SearchBar />
      <div className={`pt-10 p-3 ${shipporiMincho.className}`}>
        <h2
          className={`mx-3 my-1 text-2xl font-bold ${shipporiMincho.className}`}
        >
          今週の人気
        </h2>
        <div className="grid lg:grid-cols-4 grid-cols-1 border-b border-theme border-opacity-50">
          <Card title="たまごかけごはん" />
          <Card title="たまごかけごはん" />
          <Card title="たまごかけごはん" />
          <Card title="たまごかけごはん" />
        </div>
      </div>
      <LoginModal />
    </div>
  );
}
