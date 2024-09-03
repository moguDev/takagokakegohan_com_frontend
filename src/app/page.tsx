"use client";
import { AnimatedCircle } from "@/components/AnimatedCircle";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [displayAppTitle, setDisplayAppTitle] = useState<boolean>(false);

  const handleDisplayApptitle = () => setDisplayAppTitle(true);

  return (
    <main>
      <AnimatedCircle onAnimationEnd={handleDisplayApptitle} />
      <div className="fixed top-0 w-screen">
        <div
          className={`flex flex-col items-center justify-center max-w-7xl mx-auto h-screen transition-all duration-1000 ${
            displayAppTitle ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="text-black font-black lg:text-8xl text-4xl">
            <span>たまごかけごはん</span>
            <span className="lg:text-4xl text-xl">
              <span className="text-yellow-600">.</span>com
            </span>
          </h1>
          <div
            className={`lg:text-2xl text-base font-semibold opacity-50 text-center py-3`}
          >
            <p>The Most Simple Breakfast Solution.</p>
            <p>Keep Your Days Awesome.</p>
          </div>
          <div className="flex items-center">
            <Link
              href="/recipes"
              className={`
              bg-gradient rounded-full m-1
              lg:h-52 lg:w-52 h-32 w-32 flex items-center justify-center shadow
              transition-all duration-500 cursor-pointer
              active:scale-95 animate-fade-in-2s`}
            >
              <p className="text-white lg:text-3xl text-lg font-semibold select-none">
                Get started
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
