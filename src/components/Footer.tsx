import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 mt-5 p-2 bg-black text-white w-full bg-opacity-90 backdrop-blur">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/terms"
            className="lg:text-center text-sm px-3 py-1 hover:text-blue-300 hover:underline transition-all duration-300"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="lg:text-center text-sm px-3 py-1 hover:text-blue-300 hover:underline transition-all duration-300"
          >
            プライバシーポリシー
          </Link>
          <p className="text-center text-sm px-3 py-1">
            © 2024 たまごかけごはん.com All Rights Reserved.
          </p>
        </div>
        <div className="flex items-center px-3 py-1">
          <p>Developed by </p>
          <a
            href="https://x.com/potatoman_dev"
            className="mx-1 text-blue-300 font-bold"
          >
            @potatoman_dev
          </a>
          ,
          <a
            href="https://x.com/mogu_57B"
            target="_blank"
            className="mx-1 text-blue-300 font-bold"
          >
            @mogu_57B
          </a>
          .
        </div>
      </div>
    </footer>
  );
};
