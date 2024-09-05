import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { RecoilRootWrapper } from "@/components/RecoilRootWrapper";
import { TabNavigation } from "@/components/TabNavigation";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { Toast } from "@/components/Toast";

export const font = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "たまごかけごはん.com",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <body className={`${font.className} text-black bg-white`}>
        <RecoilRootWrapper>
          <Header />
          <main className="py-16 w-screen">
            <div className="w-full">{children}</div>
          </main>
          <TabNavigation />
          <Toast />
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
