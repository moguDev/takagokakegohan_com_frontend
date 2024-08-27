import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-5 p-2">
      <div className="lg:flex items-center justify-between">
        <div className="flex items-center">
          <Link
            href="/terms"
            className="lg:text-center text-sm px-2 py-1 hover:underline"
          >
            利用規約
          </Link>
          <Link
            href="/privacy"
            className="lg:text-center text-sm px-2 py-1 hover:underline"
          >
            プライバシーポリシー
          </Link>
          <Link
            href="/contact"
            className="lg:text-center text-sm px-2 py-1 hover:underline"
          >
            お問い合わせ
          </Link>
        </div>
        <div className="lg:flex items-center">
          <p className="lg:text-center text-sm px-2 py-1">
            © 2024 たまごかけごはん.com
          </p>
          <p className="lg:text-center text-sm px-2 py-1">
            Developed by{" "}
            <a
              href="https://x.com/potatoman_dev"
              target="_blank"
              className="text-blue-700 underline"
            >
              @potatoman-dev
            </a>
            ,{" "}
            <a
              href="https://x.com/mogu_57B"
              target="_blank"
              className="text-blue-700 underline"
            >
              @mogu_57B
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
};
