import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { RecoilRootWrapper } from "@/components/RecoilRootWrapper";
import { TabNavigation } from "@/components/TabNavigation";
import { Zen_Kaku_Gothic_New } from "next/font/google";
import { SideNavigation } from "@/components/SideNavigation";
import { CardMenu } from "@/components/CardMenu";
import { Footer } from "@/components/Footer";
import GoogleAnalytics from "@/components/googleAnalytics/GoogleAnalytics";

export const font = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "たまごかけごはん.com : たまごかけごはん専用の料理レシピサービス",
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
    images: "https://たまごかけごはん.com/images/opengraph-image.png",
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
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fcfcf5" />
        <GoogleAnalytics />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
      </head>
      <body className={`${font.className} text-black bg-theme`}>
        <RecoilRootWrapper>
          <div className="drawer drawer-end">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
              <main className="md:pt-20 pt-[72px] relative w-screen">
                <Header />
                <div className="flex w-full">
                  <div className="pb-16 md:px-5 px-2 w-full h-full">
                    {children}
                  </div>
                  <div className="w-96 relative md:block hidden">
                    <SideNavigation />
                  </div>
                </div>
                <div className="w-full md:hidden">
                  <TabNavigation />
                </div>
                <div className="w-full md:flex hidden">
                  <Footer />
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
