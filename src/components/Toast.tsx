"use client";
import { atom } from "recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useParams, usePathname } from "next/navigation";

export const toastState = atom<string | null>({
  key: "toastState",
  default: null,
});

export const Toast = () => {
  const [message, setMessage] = useRecoilState(toastState);
  const pathName = usePathname();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div
      className={`z-30 fixed w-full  ${
        pathName === "/recipes" ? "top-[115px]" : "top-16"
      } ${message ? "h-20" : "h-0"}`}
    >
      <p
        className={`
          text-center md:text-sm text-sm font-bold p-4
          bg-yellow-600 bg-opacity-80 backdrop-blur-sm text-white w-full
        `}
      >
        {message}
      </p>
    </div>
  );
};
