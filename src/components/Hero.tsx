"use client";
import { AnimatedCircle } from "@/components/AnimatedCircle";
import Link from "next/link";
import { useState } from "react";
import riceImage from "/public/images/rice.png";
import Image from "next/image";
import { Footer } from "./Footer";

export const Hero = () => {
  const [displayAppTitle, setDisplayAppTitle] = useState<boolean>(false);

  const handleDisplayApptitle = () => setDisplayAppTitle(true);

  return (
    <main>
      <AnimatedCircle onAnimationEnd={handleDisplayApptitle} />
      <div className="fixed top-0 w-screen h-full">
        <div
          className={`flex flex-col items-center justify-center max-w-7xl mx-auto h-screen transition-all duration-1000 ${
            displayAppTitle ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-1/2" />
          <div className="flex flex-col items-center justify-center translate-y-10">
            <h1 className="text-black font-black lg:text-8xl text-4xl scale-110">
              <span>たまごかけごはん</span>
              <span className="lg:text-4xl text-xl">
                <span className="text-yellow-600">.</span>com
              </span>
            </h1>
            <div
              className={`lg:text-3xl text-base font-thin text-gray-800 text-center pt-3 lg:pt-6 pb-6 lg:pb-12`}
            >
              <p>The Most Simple Breakfast Solution.</p>
              <p>Keep Your Days Awesome.</p>
            </div>
            <Link
              href="/recipes"
              className={`
              bg-yellow-600 rounded-full m-1
              lg:h-44 lg:w-44 h-32 w-32 flex items-center justify-center shadow-2xl
              transition-all duration-500 cursor-pointer
              active:scale-95 animate-fade-in-2s z-10 lg:border-8 border-4 border-eggline`}
            >
              <p className="text-white lg:text-2xl text-lg font-black select-none">
                Get started
              </p>
            </Link>
            <Image
              src={riceImage}
              alt="rice"
              className="lg:-translate-y-64 lg:scale-125 -translate-y-56 opacity-60"
            />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  );
};
