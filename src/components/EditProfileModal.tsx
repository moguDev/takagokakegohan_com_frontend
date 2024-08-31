"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface FormData {
  avatar: FileList | null;
  name: string;
  introduction: string;
}

export const EditProfileModal = () => {
  const { auth, updateProfile } = useAuth();
  const defaultValues: FormData = {
    avatar: null,
    name: auth.name,
    introduction: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });
  const imgFile = watch("avatar");

  useEffect(() => console.log(imgFile!), [imgFile]);

  const onsubmit = async (data: FormData) => {
    try {
      await updateProfile(data.avatar ? data.avatar[0] : null, data.name);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div>
      <input type="checkbox" id="edit-profile-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-white rounded shadow-xl">
          <div className="flex items-center justify-between pb-5">
            <div className="flex items-center">
              <label
                htmlFor="edit-profile-modal"
                className="material-icons mr-1 cursor-pointer my-btn"
              >
                close
              </label>
              <h3 className="font-bold text-xl text-yellow-950">
                プロフィールの編集
              </h3>
            </div>
          </div>
          <form onSubmit={handleSubmit(onsubmit)}>
            <div>
              <input type="file" accept="image/*" {...register("avatar")} />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs my-1">
                アカウント名<span className="text-red-500">【必須】</span>
              </label>
              <input
                type="text"
                className="my-1 p-1 border-b border-black outline-none"
                placeholder="アカウント名"
                {...register("name", {
                  required: "アカウント名を入力してください。",
                  maxLength: {
                    value: 32,
                    message: "アカウント名は32文字以内にしてください。",
                  },
                })}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="name" className="text-xs my-1">
                自己紹介
              </label>
              <input
                type="text"
                className="my-1 p-1 border-b border-black outline-none"
                {...register("introduction", {
                  maxLength: {
                    value: 64,
                    message: "64文字以内にしてください。",
                  },
                })}
              />
            </div>
            <button
              type="submit"
              className="bg-yellow-600 text-white py-2 rounded text-sm my-btn w-full"
            >
              保存
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
