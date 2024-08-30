"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { CardMenu } from "./CardMenu";
import { useEffect } from "react";

export const Header = () => {
  const { auth, loading, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <header className="bg-theme bg-opacity-80 backdrop-blur-sm fixed top-0 h-16 w-full md:px-5 px-3 py-2 font-Zen_Kaku_Gothic_New z-40">
      <div className="flex items-center justify-between h-full">
        <Link
          href="/"
          className="text-white md:text-2xl text-lg font-black select-none"
        >
          たまごかけごはん
          <span className="md:text-xl text-base font-semibold">
            <span className="text-yellow-500">.</span>com
          </span>
        </Link>
        <div className="items-center flex">
          {loading ? (
            <div className="flex items-center text-white">
              <span className="loading loading-spinner loading-xs mr-2" />
              Loading...
            </div>
          ) : auth.isAuthenticated ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="text-white material-icons m-1"
              >
                account_circle
              </div>
              <CardMenu />
            </div>
          ) : (
            <>
              <div className="md:flex items-center hidden">
                <label
                  htmlFor="login-modal"
                  className="flex items-center rounded mx-1 px-6 py-3 bg-yellow-600 text-white active:scale-95 transition-all duration-300"
                >
                  <span className="material-icons pr-1">login</span>
                  <p className="outline-none w-full font-bold">ログイン</p>
                </label>
                <Link
                  href="/signup"
                  className="flex items-center rounded mx-1 px-4 py-3 bg-white bg-opacity-90 text-black active:scale-95 transition-all duration-300"
                >
                  <span className="material-icons pr-1">person_add</span>
                  <p className="outline-none w-full font-bold">
                    アカウント作成
                  </p>
                </Link>
              </div>
              <div className="dropdown dropdown-end md:hidden block">
                <div
                  tabIndex={0}
                  role="button"
                  className="text-white material-icons m-1"
                >
                  menu
                </div>
                <CardMenu />
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
