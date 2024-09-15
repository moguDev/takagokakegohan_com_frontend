import { Metadata } from "next";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title:
    "アカウントを作成 | たまごかけごはん.com : たまごかけごはん専用の料理レシピサービス",
};

export default function SignupPage() {
  return <SignupForm />;
}
