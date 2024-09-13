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
      className={`z-30 mt-2 w-max mx-auto transition-all duration-300 ${
        message ? "opacity-100" : "h-0 opacity-0"
      }`}
    >
      <p
        className={`
          text-center md:text-sm text-xs font-semibold px-5 py-1 text-white
          bg-blue-500 bg-opacity-80 backdrop-blur-sm rounded-full h-full
          flex items-center justify-center
        `}
      >
        {message}
      </p>
    </div>
  );
};
