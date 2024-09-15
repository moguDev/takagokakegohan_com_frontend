"use client";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useSetRecoilState } from "recoil";
import { toastState } from "./Toast";

export const SearchBar = () => {
  const router = useRouter();
  const setToast = useSetRecoilState(toastState);
  const [query, setQuery] = useState<string>("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (query !== "") {
      router.push(`/recipes?q=${encodeURIComponent(query)}`);
    } else {
      setToast({ message: "キーワードが入力されていません", case: "alert" });
    }
  };

  return (
    <div className="p-3 pb-3 z-10 bg-white max-w-7xl mx-auto rounded-md mb-3">
      <div className="flex items-center justify-between px-1 pt-1 py-3">
        <h2 className="flex items-center text-black md:text-xl text-base font-bold">
          <span className="material-icons text-yellow-600 mr-1">
            manage_search
          </span>
          食材や調味料でさがす
        </h2>
      </div>
      <form
        onSubmit={handleSubmit}
        className="bg-gray-50 rounded-md border border-gray-200 shadow-sm flex items-center p-1 w-full"
      >
        <span className="material-icons text-gray-300 mx-1">search</span>
        <input
          type="text"
          className="bg-gray-50 w-full outline-none"
          placeholder="家にある食材や調味料は？"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-yellow-600 text-white text-center text-sm font-semibold rounded-md p-2 w-20 my-btn"
        >
          検索
        </button>
      </form>
    </div>
  );
};
