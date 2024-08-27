import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="pt-5 p-2">
      <div className="lg:flex items-center justify-center">
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
        <p className="lg:text-center text-sm px-2 py-1">
          © 2024 たまごかけごはん.com
        </p>
      </div>
    </footer>
  );
};
