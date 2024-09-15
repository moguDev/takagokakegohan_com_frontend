import { Metadata } from "next";
import { SigninForm } from "./SigninForm";

export const metadata: Metadata = {
  title:
    "ログイン | たまごかけごはん.com : たまごかけごはん専用の料理レシピサービス",
};

export default function Page() {
  return <SigninForm />;
}
