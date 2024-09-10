import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { RecoilRootWrapper } from "@/components/RecoilRootWrapper";
import { TabNavigation } from "@/components/TabNavigation";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { Toast } from "@/components/Toast";
import { SideNavigation } from "@/components/SideNavigation";
import { CardMenu } from "@/components/CardMenu";

export const font = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "たまごかけごはん.com",
  description: "たまごかけごはん専用の料理レシピサービス",
  openGraph: {
    title: "たまごかけごはん.com",
    description: "たまごかけごはん専用の料理レシピサービス",
    url: "https://たまごかけごはん.com",
    siteName: "たまごかけごはん.com",
    images: "./opengraph-image.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "たまごかけごはん.com",
    description: "たまごかけごはん専用の料理レシピサービス",
    images: "./opengraph-image.png",
  },
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
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <meta
          name="twitter:image"
          content="http://localhost:3030/twitter-image"
        />
      </head>
      <body className={`${font.className} text-black bg-theme`}>
        <RecoilRootWrapper>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <main className="w-screen">
                <Header />
                <Toast />
                <div className="flex w-screen">
                  <div className="md:py-24 py-20 w-full">{children}</div>
                  <div className="my-[53px] w-80 relative md:block hidden">
                    <SideNavigation />
                  </div>
                </div>
                <div className="w-full md:hidden">
                  <TabNavigation />
                </div>
              </main>
            </div>
            <div className="drawer-side z-50">
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="drawer-overlay"
              />
              <label
                htmlFor="my-drawer-4"
                aria-label="close sidebar"
                className="menu bg-opacity-0 min-h-full pt-12 p-4 z-50"
              >
                <CardMenu />
              </label>
            </div>
          </div>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
