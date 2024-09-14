"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCheckName } from "@/hooks/useCheckName";
import { Loading } from "@/components/Loading";
import { useSetRecoilState } from "recoil";
import { toastState } from "@/components/Toast";

type FormData = {
  email: string;
  password: string;
  passwordConfirmation: string;
  name: string;
  nickname: string;
};

export const SignupForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const { auth, loading, signup, errors: authErrors } = useAuth();
  const setToast = useSetRecoilState(toastState);
  const { isUnique, checkName } = useCheckName();
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
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const name = watch("name");

  useEffect(() => {
    checkName(name);
  }, [name, checkName]);

  const onsubmit = async (data: FormData) => {
    try {
      await signup(data);
      router.replace(`/${data.name}`);
    } catch (error) {
      console.error(error);
    }
  };

  if (auth.isAuthenticated) {
    setToast({ message: "ログイン中です", case: "success" });
    router.push("/");
    return <></>;
  }

  if (process.env.NEXT_PUBLIC_MAINTENANCE_MODE) {
    setToast({ message: "メンテナンス中", case: "alert" });
    router.push("/signin");
    return <></>;
  }
  return (
    <div className="relative">
      <Loading text="アカウントを作成しています..." loading={loading} />
      <div className="max-w-xl mx-auto bg-white rounded-md p-5">
        <h1 className="font-bold flex items-center text-lg">
          <span className="material-icons text-yellow-600 mr-1">
            person_add
          </span>
          アカウントを作成
        </h1>
        {authErrors.map((error, index) => (
          <p key={index} className="text-sm text-red-500 mt-5 font-bold">
            {error}
          </p>
        ))}
        <form onSubmit={handleSubmit(onsubmit)} method="post">
          <div className="flex flex-col my-5">
            <label htmlFor="name" className="text-xs text-gray-400 p-1">
              ユーザID
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">
                alternate_email
              </span>
              <input
                type="text"
                className="bg-white w-full outline-none"
                placeholder={`英数字 , '_' , '-' のみ使用可能`}
                {...register("name", {
                  required: "ユーザIDを入力してください。",
                  maxLength: {
                    value: 32,
                    message: "ユーザIDは32文字以内にしてください。",
                  },
                  pattern: {
                    value: /^(?=.*[a-zA-Z])[a-zA-Z0-9_-]+$/,
                    message:
                      "1字以上の英字および、'_' , '-' のみ使用できます。",
                  },
                })}
              />
              {name && (
                <p
                  className={`flex items-center text-xs font-bold w-48 scale-80 ${
                    isUnique ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span className="material-icons" style={{ fontSize: "12px" }}>
                    {isUnique ? "check" : "close"}
                  </span>
                  {isUnique ? "使用できます" : "使用できません"}
                </p>
              )}
            </div>
            <div className="text-red-500 text-xs p-1">
              {errors.name?.message}
            </div>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="nickname" className="text-xs text-gray-400 p-1">
              アカウント名
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">person</span>
              <input
                id="nickname"
                type="text"
                className="bg-white w-full outline-none"
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
              {errors.nickname?.message}
            </div>
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="email" className="text-xs text-gray-400 p-1">
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
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="password" className="text-xs text-gray-400 p-1">
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
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="password" className="text-xs text-gray-400 p-1">
              パスワード（確認用）
            </label>
            <div className="bg-white flex items-center border-b border-gray-200 p-1">
              <span className="material-icons opacity-20 p-2">password</span>
              <input
                type={isPasswordVisible ? "text" : "password"}
                className="bg-white h-full w-full outline-none"
                placeholder="半角英数のみ8文字以上"
                {...register("passwordConfirmation", {
                  required: "パスワード（確認用）を入力してください。",
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
              {errors.passwordConfirmation?.message}
            </div>
          </div>
          <label className="flex items-center cursor-pointer text-xs mx-1 mb-5">
            <input
              type="checkbox"
              checked={isChecked}
              onClick={() => setIsChecked((prev) => !prev)}
              className="checkbox checkbox-info mr-1"
            />
            <span>
              <Link
                href="/terms"
                className="underline text-blue-400 px-1 cursor-pointer"
              >
                利用規約
              </Link>
              および
              <Link
                href="/privacy"
                className="underline text-blue-400 px-1 cursor-pointer"
              >
                プライバシーポリシー
              </Link>
              に同意しました。
            </span>
          </label>
          <button
            type="submit"
            className={`
              bg-yellow-600 px-6 py-4 rounded mx-1transition-all duration-300 active:scale-95 w-full
            `}
          >
            <p className="text-white font-semibold flex items-center justify-center">
              <span className="material-icons mr-1">person_add</span>
              アカウントの作成
            </p>
          </button>
          <button
            type="button"
            className="x-6 py-4 rounded mx-1transition-all duration-300 active:scale-95 w-full"
            onClick={() => router.back()}
          >
            キャンセル
          </button>
        </form>
      </div>
    </div>
  );
};
