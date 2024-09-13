"use client";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";
import { useState } from "react";
import { Loading } from "@/components/Loading";

type FormData = {
  email: string;
  password: string;
};

export const SigninForm = () => {
  const { login, loading, errors: authErrors } = useAuth();
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const setMessage = useSetRecoilState(toastState);
  const router = useRouter();
  const defaultValues = {
    email: "",
    password: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onsubmit = async (data: FormData) => {
    await login(data.email, data.password)
      .then(() => {
        router.back();
        setMessage("ログインしました");
      })
      .catch(() => {});
  };

  return (
    <div className="relative">
      <Loading text="ログイン中" loading={loading} />
      <div className="max-w-xl mx-auto p-5 bg-white rounded-md">
        <h1 className="font-bold flex items-center text-lg">
          <span className="material-icons text-yellow-600 mr-1">login</span>
          ログイン
        </h1>
        {authErrors.map((error, index) => (
          <p key={index} className="text-sm text-red-500 mt-5 font-bold">
            {error}
          </p>
        ))}
        <form onSubmit={handleSubmit(onsubmit)} method="post">
          <section className="flex flex-col my-5">
            <label htmlFor="email" className="text-sm text-gray-400 p-1">
              メールアドレス
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">email</span>
              <input
                type="email"
                className="bg-white w-full outline-none"
                placeholder="tkg@example.com"
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
          </section>
          <section className="flex flex-col my-5">
            <label htmlFor="password" className="text-sm text-gray-400 p-1">
              パスワード
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">password</span>
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="bg-white h-full w-full outline-none"
                placeholder="半角英数のみ8文字以上"
                {...register("password", {
                  required: "パスワードを入力してください。",
                  minLength: {
                    value: 8,
                    message: "パスワードは8文字以上にしてください。",
                  },
                })}
              />
              <span
                className="material-icons opacity-20 p-2"
                onClick={() => setIsPasswordVisible((prev) => !prev)}
              >
                {isPasswordVisible ? "visibility" : "visibility_off"}
              </span>
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.password?.message}
            </div>
          </section>
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
