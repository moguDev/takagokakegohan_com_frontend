import Image from "next/image";
import riceImage from "/public/images/rice.png";
export default function Loading() {
  return (
    <div className="fixed top-0 flex flex-col justify-center items-center h-screen w-screen text-gray-600">
      <span className="loading loading-ball loading-lg shadow-xl text-yellow-600 scale-150 z-10" />
      <div className="-translate-y-6">
        <Image
          src={riceImage}
          alt="rice_image"
          width={84}
          height={84}
          className="opacity-80"
        />
        <p className="text-black opacity-60 text-xs text-center my-2">
          読み込み中...
        </p>
      </div>
    </div>
  );
}
