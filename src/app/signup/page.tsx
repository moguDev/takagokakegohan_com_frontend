"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Sawarabi_Mincho } from "next/font/google";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  nickname: string;
};

const shipporiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

const SignupPage = () => {
  const { loading, signup } = useAuth();
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
    name: "",
    nickname: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = async (data: FormData) => {
    try {
      await signup(
        data.email,
        data.password,
        data.passwordConfirmation,
        data.name,
        data.nickname
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-20 p-2">
      <div className="max-w-4xl mx-auto mt-32 bg-white p-10 shadow">
        <h1 className={`text-3xl font-semibold ${shipporiMincho.className}`}>
          アカウントの作成
        </h1>
        <form onSubmit={handleSubmit(onsubmit)} method="post">
          <div className="flex flex-col my-5">
            <label htmlFor="name" className="text-sm text-gray-400 p-1">
              ユーザID
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="text-gray-400 font-bold px-3">@</span>
              <input
                type="text"
                className="w-full rounded-lg outline-none"
                placeholder={`半角英数字および、"_"、"-"のみ使用可能`}
                {...register("name", {
                  required: "ユーザIDを入力してください。",
                  maxLength: {
                    value: 32,
                    message: "ユーザIDは32文字以内にしてください。",
                  },
                })}
              />
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.name?.message}
            </div>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="nickname" className="text-sm text-gray-400 p-1">
              アカウント名
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">person</span>
              <input
                id="nickname"
                type="text"
                className="w-full rounded-lg outline-none"
                placeholder="アカウント名"
                {...register("nickname", {
                  required: "アカウント名を入力してください。",
                  maxLength: {
                    value: 32,
                    message: "アカウント名は32文字以内にしてください。",
                  },
                })}
              />
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.name?.message}
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
                {...register("email", {
                  required: "メールアドレスを入力してください。",
                  pattern: {
                    value: /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                    message: "メールアドレスの形式が不正です。",
                  },
                })}
              />
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.email?.message}
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
                {...register("password", {
                  required: "パスワードを入力してください。",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上にしてください。",
                  },
                })}
              />
              <span className="material-icons opacity-20 p-2">
                visibility_off
              </span>
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.password?.message}
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
                {...register("passwordConfirmation", {
                  required: "パスワード（確認用）を入力してください。",
                })}
              />
              <span className="material-icons opacity-20 p-2">
                visibility_off
              </span>
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.passwordConfirmation?.message}
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
    </div>
  );
};

export default SignupPage;
