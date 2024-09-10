"use client";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import defaultImage from "/public/images/default_avatar.png";
import { useRouter } from "next/navigation";
import { useCheckName } from "@/hooks/useCheckName";
import { useSetRecoilState } from "recoil";
import { toastState } from "./Toast";

interface FormData {
  avatar: FileList | null;
  name: string;
  nickname: string;
  introduction: string;
}

export const showEditProfileModal = () =>
  (
    document.getElementById("edit-profile-modal") as HTMLDialogElement
  ).showModal();

export const closeEditProfileModal = () =>
  (document.getElementById("edit-profile-modal") as HTMLDialogElement).close();

export const EditProfileModal = () => {
  const setMessage = useSetRecoilState(toastState);
  const router = useRouter();
  const { auth, updateProfile } = useAuth();
  const { isUnique, checkName } = useCheckName();
  const defaultValues: FormData = {
    avatar: null,
    name: auth.name,
    nickname: auth.nickname,
    introduction: "",
  };
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({ defaultValues });
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const imageFile = watch("avatar");
  const [imageSource, setImageSource] = useState("");
  const name = watch("name");

  useEffect(() => {
    setValue("name", auth.name);
    setValue("nickname", auth.nickname);
    setValue("introduction", "");
  }, [auth, setValue]);

  useEffect(() => {
    if (imageFile && imageFile[0]) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setImageSource(fileReader.result as string);
      };
      fileReader.readAsDataURL(imageFile[0]);
    }
  }, [imageFile]);

  useEffect(() => {
    checkName(name);
  }, [name]);

  const onsubmit = async (data: FormData) => {
    try {
      await updateProfile(
        data.avatar ? data.avatar[0] : null,
        data.name,
        data.nickname
      );
      closeEditProfileModal();
      router.push(`/${data.name}`);
      setMessage("プロフィールを更新しました。");
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <dialog id="edit-profile-modal" className="modal">
      <div className="modal-box bg-white rounded shadow-xl">
        <div className="flex items-center justify-between pb-5">
          <h3 className="font-bold text-xl text-yellow-950">
            プロフィールの編集
          </h3>
          <button
            className="material-icons mr-1 cursor-pointer my-btn"
            onClick={closeEditProfileModal}
          >
            close
          </button>
        </div>
        <form method="put" onSubmit={handleSubmit(onsubmit)}>
          <button
            type="button"
            onClick={() => {
              fileInputRef.current?.click();
            }}
            className="h-20 w-20 rounded-full relative"
          >
            <div
              className={`
                  absolute top-0 left-0 bg-gray-300 rounded-full w-full h-full z-10 opacity-0
                  hover:opacity-50 transition-all duration-300 material-icons`}
            >
              <span className="w-full h-full flex items-center justify-center">
                add_a_photo
              </span>
            </div>
            <Image
              src={
                imageSource !== ""
                  ? imageSource
                  : auth.avatar.url || defaultImage
              }
              alt="アイコン"
              className="object-cover rounded-full"
              fill
            />
          </button>
          <div>
            <input
              type="file"
              accept="image/*"
              {...register("avatar")}
              ref={(e: HTMLInputElement) => {
                register("avatar").ref(e);
                fileInputRef.current = e;
              }}
              hidden
            />
          </div>
          <div className="flex flex-col my-5">
            <label htmlFor="nickname" className="text-xs my-1">
              ユーザID<span className="text-red-500">【必須】</span>
            </label>
            <div className="bg-white flex items-center border-b border-gray-300 p-1">
              <span className="font-bold mr-0.5">@</span>
              <input
                type="text"
                className="bg-white w-full rounded-lg outline-none"
                placeholder={`半角英数字、"_"、"-"のみ使用可能`}
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
              {name && name !== auth.name && (
                <p
                  className={`flex items-center text-xs font-bold w-48 scale-80 ${
                    isUnique ? "text-green-500" : "text-red-500"
                  }`}
                >
                  <span className="material-icons scale-75">
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
          <div className="flex flex-col mb-5">
            <label htmlFor="nickname" className="text-xs my-1">
              アカウント名<span className="text-red-500">【必須】</span>
            </label>
            <input
              id="nickname"
              type="text"
              className="bg-white my-1 p-1 border-b border-gray-300 outline-none"
              placeholder="アカウント名"
              {...register("nickname", {
                required: "アカウント名を入力してください。",
                maxLength: {
                  value: 32,
                  message: "アカウント名は32文字以内にしてください。",
                },
              })}
            />
            <div className="text-red-500 text-xs p-1">
              {errors.nickname?.message}
            </div>
          </div>
          <div className="flex flex-col">
            <label htmlFor="name" className="text-xs my-1">
              自己紹介
            </label>
            <input
              type="text"
              className="bg-white my-1 p-1 border-b border-gray-300 outline-none"
              {...register("introduction", {
                maxLength: {
                  value: 64,
                  message: "64文字以内にしてください。",
                },
              })}
            />
          </div>
          <div className="modal-action">
            <button
              type="submit"
              className="bg-yellow-600 text-white py-4 rounded font-bold my-btn w-full"
            >
              プロフィールを保存
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
