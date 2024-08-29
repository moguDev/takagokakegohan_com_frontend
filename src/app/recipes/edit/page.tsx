"use client";

interface RedipeData {
  title: string;
  body: string;
  cooking_time: number;
  image: FileList | null;
  ingredients: Ingredient[];
  steps: Step[];
}

interface Ingredient {
  name: string;
  amount: string;
}

interface Step {
  stemNumber: number;
  instruction: string;
  image: FileList | null;
}

const RecipesEditPage: React.FC = () => {
  return (
    <div className="pt-20 max-w-7xl mx-auto p-3">
      <form className="lg:flex">
        <div className="w-full">
          <div className="p-5 mb-1 bg-white shadow">
            <input
              type="text"
              className="w-full bg-gray-50 rounded text-xl outline-none my-1 p-1"
              placeholder="料理名（たまごかけごはん）"
            />
            <div>
              <input
                type="text"
                className="w-full bg-gray-50 rounded outline-none my-1 px-1 py-2"
                placeholder="説明、メッセージ、コメントなど"
              />
            </div>
          </div>
          <div className="p-5 mb-1 bg-white shadow">
            <h2 className="text-sm text-gray-500 pb-2">調味料・食材</h2>
            <div className="flex items-center">
              <p className="inline">・</p>
              <input
                type="text"
                className="w-full bg-gray-50 rounded outline-none my-1 px-1 py-2"
                placeholder="調味料・食材"
              />
              <input
                type="text"
                className="w-full bg-gray-50 rounded outline-none my-1 ml-1 px-1 py-2"
                placeholder="分量"
              />
            </div>
            <div className="flex items-center">
              <p className="inline">・</p>
              <input
                type="text"
                className="w-full bg-gray-50 rounded outline-none my-1 px-1 py-2"
                placeholder="調味料・食材"
              />
              <input
                type="text"
                className="w-full bg-gray-50 rounded outline-none my-1 ml-1 px-1 py-2"
                placeholder="分量"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:ml-1">
          <div className="p-5 bg-white shadow h-max">
            <h2 className="text-sm text-gray-500 pb-2">作り方</h2>
            <div className="border-b border-gray-200 mb-3">
              <div className="flex items-center">
                <p className="inline">{"1"}. </p>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                  placeholder="適当な器に卵を割り入れ、よく混ぜる"
                />
                <button className="material-icons text-gray-400 scale-75">
                  close
                </button>
              </div>
              <input type="file" className="hidden" />
            </div>
            <div className="border-b border-gray-200 mb-3">
              <div className="flex items-center">
                <p className="inline">{"2"}. </p>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                  placeholder="適当な器に卵を割り入れ、よく混ぜる"
                />
                <button className="material-icons text-gray-400 scale-75">
                  close
                </button>
              </div>
              <input type="file" className="hidden" />
            </div>
            <div className="border-b border-gray-200 mb-3">
              <div className="flex items-center">
                <p className="inline">{"3"}. </p>
                <input
                  type="text"
                  className="w-full bg-gray-50 rounded outline-none my-1 p-2"
                  placeholder="適当な器に卵を割り入れ、よく混ぜる"
                />
                <button className="material-icons text-gray-400 scale-75">
                  close
                </button>
              </div>
              <input type="file" className="hidden" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RecipesEditPage;
