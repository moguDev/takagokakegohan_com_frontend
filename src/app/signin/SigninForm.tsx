"use client";
import { useForm } from "react-hook-form";
import { Sawarabi_Mincho } from "next/font/google";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

type FormData = {
  email: string;
  password: string;
};

const shipporiMincho = Sawarabi_Mincho({
  subsets: ["latin"],
  weight: ["400"],
});

export const SigninForm = () => {
  const { auth, loading, login } = useAuth();
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
    watch,
    formState: { errors },
  } = useForm({ defaultValues });
  const name = watch("name");

  useEffect(() => {
    console.log(name);
  }, [name]);

  const onsubmit = async (data: FormData) => {
    try {
      await login(data.email, data.password);
      router.push(`/recipes`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="pt-5">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit(onsubmit)} method="post" className="px-5">
          <div className="flex flex-col my-5">
            <label htmlFor="email" className="text-sm text-gray-400 p-1">
              メールアドレス
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">email</span>
              <input
                type="email"
                className="bg-white w-full rounded-lg outline-none"
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
                className="bg-white h-full w-full rounded-lg outline-none"
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
          <button
            type="submit"
            className="bg-yellow-600 px-6 py-4 rounded mx-1 mb-2 w-full my-btn"
          >
            <p className="text-white font-semibold flex items-center justify-center">
              <span className="material-icons mr-1">login</span>
              ログイン
            </p>
          </button>
          <Link href="/signup" className="my-btn">
            <div className="border border-yellow-600 text-yellow-600 px-6 py-4 rounded mx-1 font-semibold flex items-center w-full justify-center">
              <span className="material-icons mr-1">person_add</span>
              アカウントの作成
            </div>
          </Link>
        </form>
      </div>
    </div>
  );
};
