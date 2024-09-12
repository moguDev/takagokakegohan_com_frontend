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
    <div className={`z-30 w-full ${message ? "h-20" : "h-0"}`}>
      <p
        className={`
          text-center md:text-sm text-xs font-bold py-2
          bg-yellow-600 bg-opacity-60 backdrop-blur-sm text-white w-full
        `}
      >
        {message}
      </p>
    </div>
  );
};
