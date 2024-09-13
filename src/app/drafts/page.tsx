import { Metadata } from "next";
import { DraftRecipesPage } from "./DraftRecipesPage";

export const metadata: Metadata = {
  title:
    "下書き | たまごかけごはん.com : たまごかけごはん専用の料理レシピサービス",
};

export default function Page() {
  return <DraftRecipesPage />;
}
