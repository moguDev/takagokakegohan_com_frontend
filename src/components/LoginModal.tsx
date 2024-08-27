"use client";
import { useForm } from "react-hook-form";

type FormData = {
  email: string;
  password: string;
};

export const LoginModal = () => {
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
    <div>
      <input type="checkbox" id="login-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white bg-opacity-90 rounded shadow backdrop-blur-sm">
          <h3 className="font-bold text-xl py-3 text-yellow-950">ログイン</h3>
          <div className="relative">
            <form method="post" onSubmit={handleSubmit(onsubmit)}>
              <div className="form-control pb-3">
                <label htmlFor="email" className="label">
                  <span className="label-text text-yellow-950">
                    メールアドレス
                  </span>
                </label>
                <div className="bg-white flex items-center rounded-lg border border-gray-200">
                  <span className="material-icons opacity-20 p-2">email</span>
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="user@example.com"
                    className="w-full outline-none pr-2 rounded-lg text-lg"
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
                  <span className="label-text text-yellow-950">パスワード</span>
                </label>
                <div className="bg-white flex items-center rounded-lg border border-gray-200">
                  <span className="material-icons opacity-20 p-2">
                    password
                  </span>
                  <input
                    type="password"
                    className="w-full outline-none pr-2 rounded-lg text-lg"
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
                <label
                  htmlFor="login-modal"
                  className="text-gray-800 bg-opacity-0 mx-1 cursor-pointer my-btn"
                >
                  キャンセル
                </label>
                <button
                  type="submit"
                  className="rounded font-bold bg-yellow-600 text-yellow-100 px-5 py-3 my-btn mx-1"
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
