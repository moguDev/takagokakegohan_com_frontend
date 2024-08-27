"use client";
import { Inter } from "next/font/google";
import Image from "next/image";
import hero_photo from "/public/images/tkg_01.jpg";
import { useEffect, useState } from "react";
import Link from "next/link";

const fontInter = Inter({
  subsets: ["latin"],
});

export const Hero: React.FC = () => {
  const [headOpacity, setHeadOpacity] = useState(0);
  useEffect(() => {}, []);
  return (
    <div className="relative md:h-hero h-96">
      <Image
        src={hero_photo}
        alt="hero_photo"
        className="absolute top-0 w-full object-cover overflow-hidden h-full"
      />
      <div className="absolute flex justify-start w-full h-full bg-black bg-opacity-60 z-10 pt-20">
        <div className="flex flex-col items-center justify-center h-full lg:w-1/2 w-full">
          <div
            className={`md:text-7xl text-3xl font-black select-none animate-fade-up-2s`}
          >
            <h1 className="text-center text-white py-2">
              たまごかけごはん
              <span className="text-4xl">
                <span className="text-yellow-500">.</span>com
              </span>
            </h1>
            <div
              className={`lg:text-2xl text-sm font-semibold text-opacity-60 text-white text-center lg:py-3 py-1 ${fontInter.className}`}
            >
              <p>The Most Simple Breakfast Solution.</p>
              <p>Keep Your Days Awesome.</p>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              href="#"
              className={`
              bg-gradient rounded-full m-1
              lg:h-44 lg:w-44 h-24 w-24 flex items-center justify-center shadow
              transition-all duration-300 cursor-pointer
              active:scale-95 animate-fade-in-2s`}
            >
              <p className="text-white lg:text-2xl text-sm font-semibold select-none">
                Get started
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
