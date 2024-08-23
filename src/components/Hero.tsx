import Image from "next/image";
import hero_photo from "/public/images/bg_photo_tkg.png";

export const Hero = () => {
  return (
    <div className="relative border-b-4 border-white md:h-600px h-96">
      <Image
        src={hero_photo}
        alt="hero_photo"
        className="absolute top-0 w-full object-cover overflow-hidden h-full"
      />
      <div className="absolute w-full h-full flex flex-col items-center justify-center z-10 bg-white bg-opacity-60 pt-10">
        <div className="h-1/2" />
        <p className="md:text-7xl text-3xl font-black text-gradient-01">
          最高の1日をはじめましょう
        </p>
        <p className="md:text-2xl text-xs text-gray-900 font-semibold my-5">
          朝をよりシンプルに。もっと楽しく。もっとクリエイティブに。
        </p>
        <button
          className={`
              bg-gradient rounded-xl md:px-20 px-10 md:py-5 py-3
              border-2 border-yellow-500
              transition-all duration-700
              hover:scale-105 hover:brightness-110
              active:scale-100`}
        >
          <p className="text-white md:text-2xl text-sm font-semibold">
            <span className="md:text-xl text-xs">Get started with </span>
            たまごかけごはん！
          </p>
        </button>
        <div className="h-1/2" />
      </div>
    </div>
  );
};
