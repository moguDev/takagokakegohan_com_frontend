"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import path from "path";
import { ReactNode, use, useEffect, useState } from "react";

type NavLinkProps = {
  href: string;
  iconName: string;
};

const NavLink: React.FC<NavLinkProps> = (props: NavLinkProps) => {
  const pathName: string = usePathname();
  const [isSeleceted, setIsSelected] = useState<boolean>(false);
  useEffect(() => setIsSelected(pathName === props.href), [pathName]);
  return (
    <Link
      href={props.href}
      className={`material-icons w-full ${
        isSeleceted ? "text-opacity-100" : "text-opacity-30"
      }`}
    >
      <p
        className={`w-max mx-auto px-10 py-3 rounded-3xl bg-gray-200 transition-all duration-300 ${
          isSeleceted ? "opacity-100 bg-opacity-50" : "opacity-30 bg-opacity-0"
        }`}
      >
        {props.iconName}
      </p>
    </Link>
  );
};

export const TabNavigation = () => {
  const pathName = usePathname();

  return (
    <div
      className={`fixed bottom-0 flex items-center h-16 w-screen bg-white bg-opacity-50 border-t border-gray-100`}
    >
      <NavLink href="/" iconName="home" />
      <NavLink href="/login" iconName="person" />
    </div>
  );
};
