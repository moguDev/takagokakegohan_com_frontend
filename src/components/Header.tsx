"use client";
import { useAuth } from "@/hooks/useAuth";
import { ChangeEvent, useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "/public/images/default_avatar.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { getImageUrl } from "@/lib";

const AccountCircle = ({
  image,
  name,
}: {
  image: string | null;
  name: string;
}) => {
  return (
    <label
      id="accout-circle"
      htmlFor="my-drawer-4"
      className={`flex items-center cursor-pointer
                  transition-all duration-200 hover:scale-105`}
    >
      <div className="border border-white border-opacity-50 rounded-full h-10 w-10 relative m-1">
        <Image
          src={getImageUrl(image) || defaultImage}
          alt="アイコン"
          className="object-cover rounded-full"
          fill
        />
      </div>
      <p className="md:block hidden font-bold">{name}</p>
    </label>
  );
};

const LoginButton = ({ hidden }: { hidden: boolean }) => {
  return (
    <Link
      href="/signin"
      className={`flex items-center rounded mx-1 px-3 py-2 bg-yellow-600 text-sm text-white active:scale-95 transition-all duration-300 ${
        hidden && "hidden"
      }`}
    >
      <span className="material-icons pr-1">login</span>
      <p className="outline-none w-full font-bold">ログイン</p>
    </Link>
  );
};

export const Header = () => {
  const { auth, loading, checkAuth } = useAuth();
  const pathName = usePathname();
  const [headerText, setHeaderText] = useState<string>("たまごかけごはん.com");
  const [query, setQuery] = useState<string>("");
  const [scrollY, setScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > scrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }

    setScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollY]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setQuery(e.target.value);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    switch (true) {
      case /^\/recipes\/(\d+)\/edit$/.test(pathName):
        setHeaderText("レシピの編集");
        break;
      case pathName === "/recipes":
        setHeaderText("みつける");
        break;
      case pathName === "/recipes/bookmark":
        setHeaderText("ブックマーク");
        break;
      case pathName === "/recipes/drafts":
        setHeaderText("下書き");
        break;
      case pathName === "/signin":
        setHeaderText("ログイン");
        break;
      case pathName === "/signup":
        setHeaderText("アカウントを作成");
        break;
      case pathName === `/${auth.name}`:
        setHeaderText("プロフィール");
        break;
      case /^\/recipes\/\d+$/.test(pathName):
        setHeaderText("レシピの詳細");
        break;
      default:
        setHeaderText("たまごかけごはん.com");
        break;
    }
  }, [auth.name, pathName]);

  return (
    <header className="z-40 bg-white fixed top-0 w-full shadow">
      <div
        className={`flex items-center justify-between pl-5 pr-3 md:px-5 py-2 transition-all transform duration-500 ${
          isVisible ? "h-16 w-full" : "md:h-16 h-0  md:flex hidden"
        }`}
      >
        <div className="md:flex items-center">
          <h1 className="text-black md:text-2xl text-xl font-bold select-none">
            <Link href="/" className="md:block font-black">
              たまごかけごはん
              <span className="text-yellow-600">.</span>
              <span className="text-xl">com</span>
            </Link>
            <span className="hidden">{headerText}</span>
          </h1>
          <p className="font-medium text-yellow-900 text-center md:translate-y-1 md:text-sm text-[9.5px] md:px-2.5 md:pt-0 pt-0.5 h-full">
            <span className="text-yellow-600 font-semibold">
              {`"たまごかけごはん専用"`}
            </span>
            の料理レシピサービス
          </p>
        </div>
        <div className="items-center flex">
          {loading ? (
            <div className="flex items-center text-white">
              <span className="loading loading-spinner loading-xs mr-2" />
              Loading...
            </div>
          ) : auth.isAuthenticated ? (
            <AccountCircle image={auth.avatar.url} name={auth.nickname} />
          ) : (
            <LoginButton hidden={pathName === "/signin"} />
          )}
        </div>
      </div>
      {!pathName.startsWith("/recipes/") && (
        <div className="py-2 px-3 z-10 flex">
          <div className="bg-gray-50 rounded-md border border-gray-200 shadow-sm flex items-center p-1 w-full">
            <span className="material-icons text-gray-300 mx-1">search</span>
            <input
              type="text"
              className="bg-gray-50 w-full outline-none"
              placeholder="食材や調味料でさがす"
              onChange={handleChange}
            />
            <Link
              href={{
                pathname: "/recipes",
                query: { q: query.replace("　", " ") },
              }}
              className="bg-yellow-600 text-white text-center text-sm font-semibold rounded-md p-2 w-20 my-btn"
            >
              検索
            </Link>
          </div>
          <div className="md:w-96" />
        </div>
      )}
    </header>
  );
};
