import Image from "next/image";
import sampleImage from "/public/images/bg_photo_tkg.png";
import Link from "next/link";

type RecipeCardProps = { id: number; title: string; cooking_time: number };

export const RecipeCard = ({ id, title, cooking_time }: RecipeCardProps) => {
  return (
    <Link href={`/recipes/${id}`} className="p-2 inline-block">
      <div className="bg-white p-3 shadow hover:shadow-lg hover:-translate-y-1 cursor-pointer transition-all duration-300">
        <Image
          src={sampleImage}
          alt="sampleImage"
          className="w-full h-72 object-cover"
        />
        <section className="px-1 pt-1 pb-3">
          <div className="flex items-center justify-between py-1">
            <p className="text-xl select-none font-bold underline">{title}</p>
            <p className="text-sm flex items-center">
              <span>★</span>
              {4.5}
            </p>
          </div>
          <div className="flex items-center justify-between pb-1">
            <p>mogu</p>
            <p className="text-sm">調理時間 {cooking_time}秒</p>
          </div>
        </section>
      </div>
    </Link>
  );
};
