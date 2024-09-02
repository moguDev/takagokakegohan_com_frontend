"use client";
import { useAuth } from "@/hooks/useAuth";
import { CardMenu } from "./CardMenu";
import { useEffect, useState } from "react";
import Image, { StaticImageData } from "next/image";
import defaultImage from "/public/images/default_avatar.png";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const AccountCircle = ({ image }: { image: StaticImport | string }) => {
  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className={`
                  border border-white border-opacity-50 rounded-full h-10 w-10 relative m-1
                  transition-all duration-200 hover:scale-105`}
      >
        <Image
          src={image}
          alt="アイコン"
          className="object-cover rounded-full"
          fill
        />
      </div>
      <CardMenu />
    </div>
  );
};

const LoginButton = ({ hidden = false }: { hidden?: boolean }) => {
  return (
    <Link
      href="/signin"
      className="flex items-center rounded mx-1 px-3 py-2 bg-yellow-600 text-sm text-white active:scale-95 transition-all duration-300"
      hidden={hidden}
    >
      <span className="material-icons pr-1">login</span>
      <p className="outline-none w-full font-bold">ログイン</p>
    </Link>
  );
};

export const Header = () => {
  const { auth, loading, checkAuth } = useAuth();
  const pathName = usePathname();
  const router = useRouter();
  const [headerText, setHeaderText] = useState<string>("たまごかけごはん.com");

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    switch (pathName) {
      case "/recipes/new":
        setHeaderText("レシピを書く");
        break;
      case "/recipes":
        setHeaderText("みつける");
        break;
      case "/signin":
        setHeaderText("ログイン");
        break;
      case "/signup":
        setHeaderText("アカウントを作成");
        break;
      case `/${auth.name}`:
        setHeaderText("プロフィール");
        break;
    }
  }, [pathName]);

  return (
    <header
      className={`
        bg-white fixed top-0 h-16 w-full md:px-5 lg:px-10 px-5 py-2 font-Zen_Kaku_Gothic_New z-40`}
    >
      <div className="flex items-center justify-between h-full">
        <div className="flex items-center">
          <button
            onClick={() => router.back()}
            className={`material-icons mr-1 hidden ${
              pathName === "/recipes/new" ? "block" : "hidden"
            }`}
          >
            arrow_back
          </button>
          <h1 className="text-black text-xl font-black select-none">
            {headerText}
          </h1>
        </div>
        <div className="items-center flex">
          {loading ? (
            <div className="flex items-center text-white">
              <span className="loading loading-spinner loading-xs mr-2" />
              Loading...
            </div>
          ) : auth.isAuthenticated ? (
            <AccountCircle
              image={auth.avatar === "" ? defaultImage : auth.avatar}
            />
          ) : (
            <LoginButton hidden={pathName === "/signin"} />
          )}
        </div>
      </div>
    </header>
  );
};
