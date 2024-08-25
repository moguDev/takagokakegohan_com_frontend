"use client";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { axiosInstance } from "@/lib/axiosInstance";

type FormData = {
  image: File | null;
};

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append("s3test[image]", file);

  try {
    const response = await axiosInstance.post("/s3tests", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(response);
  } catch (error) {
    console.error("Error:", error);
  }
};

const S3TextPage = () => {
  const { handleSubmit, control, reset } = useForm<FormData>({
    defaultValues: {
      image: null,
    },
  });

  const onSubmit = async (data: FormData) => {
    if (data.image) {
      await uploadImage(data.image);
      reset();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      encType="multipart/form-data"
      className="pt-20 p-5"
    >
      <div>
        <label htmlFor="image" className="block">
          画像を選択：
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) =>
                onChange(e.target.files ? e.target.files[0] : null)
              }
              onBlur={onBlur}
              ref={ref}
              className="my-1"
            />
          )}
        />
      </div>
      <button
        type="submit"
        className=" bg-gray-200 border border-gray-500 rounded p-2 my-1 active:scale-95"
      >
        アップロード
      </button>
    </form>
  );
};

export default S3TextPage;
