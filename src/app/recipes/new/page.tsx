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
      <form method="post">
        <section className="lg:flex p-5 mb-1 bg-white shadow w-full">
          <div className="bg-gray-50 m-1 rounded lg:w-1/3 w-full min-h-60 flex items-center justify-center">
            <button className="text-gray-400 flex items-center">
              <span className="material-icons mr-2">add_a_photo</span>画像を選択
            </button>
            <input type="file" accept="image/*" hidden />
          </div>
          <div className="w-full">
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
        </section>
        <div className="lg:flex">
          <section className="lg:w-1/3 w-full">
            <div className="p-5 mb-1 bg-white shadow">
              <section className="border-b border-gray-200 mb-3">
                <h2 className="text-sm text-gray-500 pb-2">調理時間</h2>
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-1/2 bg-gray-50 rounded outline-none my-1 mr-1 px-1 py-2"
                    placeholder="30"
                  />
                  秒
                </div>
              </section>
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
          </section>
          <section className="lg:w-2/3 w-full lg:ml-1">
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
          </section>
        </div>
        <div className="flex mt-1 justify-end">
          <button
            type="button"
            className="material-icons p-2 m-1 bg-red-400 text-white rounded my-btn"
            onClick={() => []}
          >
            delete
          </button>
          <button
            type="button"
            className="material-icons p-2 m-1 border border-gray-500 text-gray-500 rounded my-btn"
            onClick={() => []}
          >
            <p className="text-sm">下書き保存</p>
          </button>
          <button
            type="submit"
            className="material-icons p-2 m-1 px-5 bg-yellow-600 text-white rounded my-btn"
            onClick={() => []}
          >
            <p className="text-sm font-bold">公開する</p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipesEditPage;
