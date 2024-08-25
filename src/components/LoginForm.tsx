"use client";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = (data: FormData) => {
    console.log(`onsubmit: ${{ data }}`);
  };

  return (
    <div className="w-full p-5">
      <h1 className="text-3xl font-semibold">ログイン</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col my-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-400 p-1"
          >
            メールアドレス
          </label>
          <div className="bg-white flex items-center rounded-lg border border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">email</span>
            <input
              type="email"
              className="w-full rounded-lg outline-none"
              placeholder="メールアドレス"
            />
          </div>
        </div>
        <div className="flex flex-col my-2">
          <label
            htmlFor="email"
            className="text-sm font-semibold text-gray-400 p-1"
          >
            パスワード
          </label>
          <div className="bg-white flex items-center rounded-lg border border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">password</span>
            <input
              type="password"
              className="h-full w-full rounded-lg outline-none"
              placeholder="パスワード"
            />
            <span className="material-icons opacity-20 p-2">
              visibility_off
            </span>
          </div>
        </div>
        <button
          type="submit"
          className={`w-full
          bg-yellow-600 px-10 py-3 rounded
          transition-all duration-300 active:scale-95`}
        >
          <p className="text-white font-bold flex items-center justify-center">
            <span className="material-icons mr-1">login</span>ログイン
          </p>
        </button>
      </form>
    </div>
  );
};
