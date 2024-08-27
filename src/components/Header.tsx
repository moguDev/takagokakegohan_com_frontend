"use client";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";

export const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  return (
    <header className="bg-theme bg-opacity-80 backdrop-blur-sm fixed top-0 h-16 w-full md:px-5 px-3 py-2 font-Zen_Kaku_Gothic_New z-50">
      <div className="flex items-center justify-between h-full">
        <Link
          href="/"
          className="text-white md:text-2xl text-xl font-black select-none"
        >
          たまごかけごはん
          <span className="text-xl font-semibold">
            <span className="text-yellow-500">.</span>com
          </span>
        </Link>
        {/* md以上で表示 */}
        <div className="items-center md:flex hidden">
          {isAuthenticated ? (
            <Link href="/" className="text-white flex items-center rounded p-2">
              <span className="material-icons mr-1">person</span>
              <span className="mr-1">user_name</span>
              <span className="">Lv. {0}</span>
            </Link>
          ) : (
            <div className="flex items-center">
              <label
                htmlFor="login-modal"
                className="flex items-center rounded mx-1 px-6 py-3 bg-yellow-600 text-white active:scale-95 transition-all duration-300"
              >
                <span className="material-icons pr-1">login</span>
                <p className="outline-none w-full font-bold">ログイン</p>
              </label>
              <Link
                href="/signup"
                className="flex items-center rounded mx-1 px-4 py-3 bg-white bg-opacity-80 text-black active:scale-95 transition-all duration-300"
              >
                <span className="material-icons pr-1">person_add</span>
                <p className="outline-none w-full font-bold">アカウント作成</p>
              </Link>
            </div>
          )}
        </div>
        <div className="md:hidden flex items-center h-full text-white">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="m-1 material-icons">
              menu
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-theme bg-opacity-90 rounded-lg z-[1] mt-5 w-52 p-1 shadow divide-y divide-white divide-opacity-10"
            >
              <li className="py-1">
                <label htmlFor="login-modal" className="my-btn">
                  <span className="material-icons">login</span>
                  ログイン
                </label>
              </li>
              <li className="py-1">
                <Link href="/signup" className="my-btn">
                  <span className="material-icons">person_add</span>
                  アカウント作成
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
};
