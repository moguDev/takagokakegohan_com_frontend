import Link from "next/link";
import Loading from "./loading";

export default function NotFound() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center h-screen w-screen">
      <h1 className="text-7xl font-black text-gray-500">404</h1>
      <p className="my-2">ページが見つかりません...</p>
      <Link href="/" className="text-blue-600 underline">
        トップページへ
      </Link>
    </div>
  );
}
