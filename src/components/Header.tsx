"use client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "/public/images/default_avatar.png";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const AccountCircle = ({
  image,
  name,
}: {
  image: StaticImport | string;
  name: string;
}) => {
  return (
    <label
      id="accout-circle"
      htmlFor="my-drawer-4"
      className={`flex items-center
                  transition-all duration-200 hover:scale-105`}
    >
      <div className="border border-white border-opacity-50 rounded-full h-10 w-10 relative m-1">
        <Image
          src={image}
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
    <header
      className={`
        bg-white fixed top-0 h-16 w-full pl-5 pr-3 md:px-5 py-2 z-40 ${
          pathName === "/" && "hidden"
        } ${pathName !== "/recipes" && "shadow-sm"}}`}
    >
      <div className="flex items-center justify-between w-full h-full">
        <h1 className="text-black md:text-2xl text-xl font-bold select-none">
          <span className="md:block hidden font-black">
            たまごかけごはん
            <span className="text-yellow-600">.</span>
            <span className="text-base">com</span>
          </span>
          <span className="md:hidden">{headerText}</span>
        </h1>
        <div className="items-center flex">
          {loading ? (
            <div className="flex items-center text-white">
              <span className="loading loading-spinner loading-xs mr-2" />
              Loading...
            </div>
          ) : auth.isAuthenticated ? (
            <AccountCircle
              image={auth.avatar.url || defaultImage}
              name={auth.nickname}
            />
          ) : (
            <LoginButton hidden={pathName === "/signin"} />
          )}
        </div>
      </div>
    </header>
  );
};
