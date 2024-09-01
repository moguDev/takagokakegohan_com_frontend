"use client";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";

export const RecoilRootWrapper = ({ children }: { children: ReactNode }) => {
  return <RecoilRoot>{children}</RecoilRoot>;
};
