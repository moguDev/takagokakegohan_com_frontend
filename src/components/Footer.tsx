import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 mt-5 p-2">
      <div className="lg:flex items-center">
        <div>
          <Link
            href="/terms"
            className="lg:text-center text-sm px-3 py-1 hover:text-blue-500  hover:text-base transition-all duration-300"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="lg:text-center text-sm px-3 py-1 hover:text-blue-500 hover:text-base transition-all duration-300"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/contact"
            className="lg:text-center text-sm px-3 py-1 hover:text-blue-500 hover:text-base transition-all duration-300"
          >
            お問い合わせ
          </Link>
        </div>
        <p className="lg:text-center text-sm px-3 py-1">
          © 2024 たまごかけごはん.com
        </p>
      </div>
    </footer>
  );
};
