"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
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
    <div className="max-w-4xl mx-auto pt-20 p-5">
      <h1 className="text-3xl font-semibold">ログイン</h1>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col my-5">
          <label htmlFor="email">メールアドレス</label>
          <div className="bg-white flex items-center rounded-lg border border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">email</span>
            <input
              type="email"
              className="w-full rounded-lg outline-none"
              placeholder="メールアドレス"
            />
          </div>
        </div>
        <div className="flex flex-col my-5">
          <label htmlFor="email">パスワード</label>
          <div className="bg-white flex items-center rounded-lg border border-gray-200 p-1">
            <span className="material-icons opacity-20 p-2">password</span>
            <input
              type="password"
              className="w-full rounded-lg outline-none"
              placeholder="パスワード"
            />
            <span className="material-icons opacity-20 p-2">
              visibility_off
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className={`
           w-1/3 py-3 rounded mx-1
           transition-all duration-300 active:scale-95`}
          >
            <p className="text-yellow-950 font-bold flex items-center justify-center">
              <span className="material-icons mr-1">arrow_back</span>もどる
            </p>
          </Link>
          <button
            type="submit"
            className={`
          bg-yellow-600 w-1/3 py-3 rounded mx-1
          transition-all duration-300 active:scale-95`}
          >
            <p className="text-white font-bold flex items-center justify-center">
              <span className="material-icons mr-1">login</span>ログイン
            </p>
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
