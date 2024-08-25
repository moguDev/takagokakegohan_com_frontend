import Image from "next/image";
import sampleImage from "/public/images/bg_photo_tkg.png";
import { cookies } from "next/headers";

type RecipeData = {
  title: string;
  chef: string;
  cooking_time: number;
  ingredients: { ingredient: string; amount: string; category: string }[];
};

const RecipeDetailPage: React.FC = () => {
  const data: RecipeData = {
    title: "めんつゆのたまごかけごはん",
    chef: "もぐ",
    cooking_time: 60,
    ingredients: [
      { ingredient: "卵", amount: "1個", category: "卵" },
      { ingredient: "白ごはん", amount: "お茶碗1杯", category: "ごはん" },
      { ingredient: "めんつゆ", amount: "大さじ1", category: "調味料" },
    ],
  };
  return (
    <div className="pt-20 p-10 w-full">
      <section className="flex">
        <Image
          src={sampleImage}
          alt="sample"
          className="h-80 object-cover rounded-xl"
          style={{ width: 500 }}
        />
        <h1 className="text-4xl font-bold pb-5">
          {data.title}
          <span className="text-xl px-2 my-auto">by {data.chef}</span>
        </h1>
      </section>
      <div className="my-2 flex">
        <section className="px-4 py-3 bg-white rounded-xl w-1/3">
          <h2 className="text-2xl text-gray-600 font-semibold">
            材料<span className="text-lg">（1人前）</span>
          </h2>
          <div className="p-1 divide-y divide-gray-200">
            {data.ingredients.map((e) => (
              <p className="my-auto py-2">
                <span className="font-semibold">{e.ingredient}</span>
                <span className="ml-2">{e.amount}</span>
              </p>
            ))}
          </div>
        </section>
        <section className="px-4 py-3 w-2/3"></section>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
