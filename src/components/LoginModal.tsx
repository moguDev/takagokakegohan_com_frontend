"use client";
import { useAuth } from "@/hooks/useAuth";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginModal = () => {
  const { loading, login } = useAuth();
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
    try {
      await login(data.email, data.password);
      const checkBox = document.getElementById(
        "login-modal"
      ) as HTMLInputElement;
      checkBox.checked = false;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white rounded shadow-xl">
          <h3 className="font-bold text-xl py-3 text-yellow-950">ログイン</h3>
          <div className="relative">
            {loading && (
              <div className="absolute flex items-center justify-center top-0 h-full w-full bg-white opacity-50">
                <span className="loading loading-spinner loading-xs mr-2" />
                ログイン中...
              </div>
            )}
            <form method="post" onSubmit={handleSubmit(onsubmit)}>
              <div className="form-control pb-3">
                <label htmlFor="email" className="label">
                  <span className="label-text text-xs text-yellow-950">
                    メールアドレス
                  </span>
                </label>
                <div className="bg-white flex items-center border-b border-gray-200">
                  <span className="material-icons opacity-20 p-2">email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="user@example.com"
                    className="w-full outline-none p-1 rounded text-lg"
                    {...register("email", {
                      required: "メールアドレスを入力してください。",
                      pattern: {
                        value:
                          /^[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/i,
                        message: "メールアドレスの形式が不正です。",
                      },
                    })}
                  />
                </div>
                <div className="text-red-500 text-xs p-1">
                  {errors.email?.message}
                </div>
              </div>
              <div className="form-control pb-2">
                <label htmlFor="password" className="label">
                  <span className="label-text text-xs text-yellow-950">
                    パスワード
                  </span>
                </label>
                <div className="bg-white flex items-center border-b border-gray-200">
                  <span className="material-icons opacity-20 p-2">
                    password
                  </span>
                  <input
                    type="password"
                    className="w-full outline-none p-1 rounded text-lg"
                    autoComplete="current-password"
                    placeholder="パスワード"
                    {...register("password", {
                      required: "パスワードを入力してください。",
                      minLength: {
                        value: 8,
                        message: "パスワードは8文字以上にしてください。",
                      },
                    })}
                  />
                </div>
                <div className="text-red-500 text-xs p-1">
                  {errors.password?.message}
                </div>
              </div>
              <div className="modal-action flex items-center">
                <button
                  type="submit"
                  className="rounded font-bold bg-yellow-600 text-yellow-100 w-full py-3 my-btn mx-1"
                >
                  ログイン
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
