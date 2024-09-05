"use client";
import { atom } from "recoil";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

export const toastState = atom<string | null>({
  key: "toastState",
  default: null,
});

export const Toast = () => {
  const [message, setMessage] = useRecoilState(toastState);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, setMessage]);

  if (!message) return null;

  return (
    <div className="z-30 fixed bottom-5 left-1/2 transform -translate-x-1/2">
      <p
        className={`
          text-center text-sm font-bold px-6 py-4 border-2 border-gray-200
          bg-gray-100 bg-opacity-95 backdrop-blur-sm text-black rounded-lg shadow-lg transition-opacity duration-300
          ${
            message ? "-translate-y-24 opacity-100" : "translate-y-10 opacity-0"
          }
        `}
      >
        {message}
      </p>
    </div>
  );
};
