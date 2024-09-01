"use client";
import { ReactNode } from "react";
import { RecoilRoot } from "recoil";
import { Zen_Kaku_Gothic_New } from "next/font/google";

const font = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const RecoilRootWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <div className={font.className}>{children}</div>
    </RecoilRoot>
  );
};
