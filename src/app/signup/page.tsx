"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Sawarabi_Mincho } from "next/font/google";

type FormData = {
  email: string;
  password: string;
};

const shipporiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

const LoginPage = () => {
  const defaultValues = {
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
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
    <div className="max-w-4xl mx-auto mt-32 bg-white p-10 shadow">
      <h1 className={`text-3xl font-semibold ${shipporiMincho.className}`}>
        アカウントの作成
      </h1>
      <form onSubmit={handleSubmit(onsubmit)} method="post">
        <div className="flex flex-col my-5">
          <label htmlFor="name" className="text-sm text-gray-400 p-1">
            アカウント名
          </label>
          <div className="bg-white flex items-center border-b border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">person</span>
            <input
              type="text"
              className="w-full rounded-lg outline-none"
              placeholder="アカウント名"
            />
          </div>
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="email" className="text-sm text-gray-400 p-1">
            メールアドレス
          </label>
          <div className="bg-white flex items-center border-b border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">email</span>
            <input
              type="email"
              className="w-full rounded-lg outline-none"
              placeholder="メールアドレス"
            />
          </div>
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="password" className="text-sm text-gray-400 p-1">
            パスワード
          </label>
          <div className="bg-white flex items-center border-b border-gray-200 p-1">
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
        <div className="flex flex-col my-5">
          <label htmlFor="password" className="text-sm text-gray-400 p-1">
            パスワード（確認用）
          </label>
          <div className="bg-white flex items-center border-b border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">password</span>
            <input
              type="password"
              className="h-full w-full rounded-lg outline-none"
              placeholder="パスワード（確認用）"
            />
            <span className="material-icons opacity-20 p-2">
              visibility_off
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`
          bg-opacity-0 py-5 rounded-lg mx-1
          transition-all duration-300 active:scale-95`}
          >
            <p className="text-gray-600 font-bold flex items-center justify-center">
              <span className="material-icons mr-1">arrow_back</span>
              もどる
            </p>
          </Link>
          <button
            type="submit"
            className={`
          bg-yellow-600 px-6 py-4 rounded mx-1
          transition-all duration-300 active:scale-95`}
          >
            <p className="text-white font-semibold flex items-center justify-center">
              <span className="material-icons mr-1">person_add</span>
              アカウントの作成
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
