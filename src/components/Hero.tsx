import Image from "next/image";
import hero_photo from "/public/images/bg_photo_tkg.png";

export const Hero = () => {
  return (
    <div className="relative border-b-4 border-white">
      <Image
        src={hero_photo}
        alt="hero_photo"
        className="absolute top-0 w-full object-cover overflow-hidden"
        style={{ height: 600 }}
      />
      <div
        className="absolute w-full flex flex-col items-center justify-center z-10 bg-white bg-opacity-50"
        style={{ height: 600 }}
      >
        <div className="h-1/2" />
        <p className="text-7xl font-black text-gradient-01 my-3">
          最高の1日をはじめましょう。
        </p>
        <p className="text-2xl text-gray-900 font-semibold mt-3 mb-5">
          朝をよりシンプルに。もっと楽しく。もっとクリエイティブに。
        </p>
        <button
          className={`
              bg-gradient rounded-xl px-20 py-5 my-5
              border-2 border-yellow-500
              transition-all duration-700
              hover:scale-105 hover:brightness-110
              active:scale-100`}
        >
          <p className="text-white text-2xl font-semibold">
            <span className="text-xl">Get started with </span>
            たまごかけごはん！
          </p>
        </button>
        <div className="h-1/2" />
      </div>
    </div>
  );
};
