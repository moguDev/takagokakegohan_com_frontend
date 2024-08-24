"use client";
import Image from "next/image";
import hero_photo from "/public/images/bg_photo_tkg.png";
import { useEffect, useState } from "react";
import Link from "next/link";

export const Hero = () => {
  const [headOpacity, setHeadOpacity] = useState(0);
  useEffect(() => {}, []);
  return (
    <div className="relative border-b-4 border-white md:h-600px h-96">
      <Image
        src={hero_photo}
        alt="hero_photo"
        className="absolute top-0 w-full object-cover overflow-hidden h-full animate-fade-in-2s"
      />
      <div className="absolute w-full h-full flex flex-col items-center justify-center z-10 bg-white bg-opacity-60 pt-10">
        <p className="md:text-8xl text-3xl font-black text-gradient-01 select-none animate-fade-up-2s">
          最高の1日をはじめましょう
        </p>
        <p className="md:text-2xl text-xs text-gray-900 font-semibold my-5 select-none animate-fade-up-2s">
          朝をよりシンプルに。もっと楽しく。もっとクリエイティブに。
        </p>
        <Link
          href="#"
          className={`
              bg-gradient rounded-xl md:px-14 px-6 md:py-5 py-2 m-1
              transition-all duration-300 cursor-pointer
              active:scale-95 animate-fade-in-2s`}
        >
          <p className="text-white md:text-2xl text-lg font-semibold select-none">
            <span className="md:text-xl text-md">Get started with </span>
            たまごかけごはん！
          </p>
        </Link>
        <Link
          href="/login"
          className={`
              bg-yellow-700 bg-opacity-80 rounded-xl md:px-14 px-6 md:py-5 py-2 m-1
              transition-all duration-300 cursor-pointer
              active:scale-95 animate-fade-in-2s`}
        >
          <p className="flex items-center text-white md:text-lg text-md font-semibold select-none">
            <span className="material-icons">login</span>
            ログインして利用する
          </p>
        </Link>
      </div>
    </div>
  );
};
