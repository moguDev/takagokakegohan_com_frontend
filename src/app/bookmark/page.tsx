import { Metadata } from "next";
import { BookmarkRecipesPage } from "./BookmarkRecipesPage";

export const metadata: Metadata = {
  title:
    "ブックマーク | たまごかけごはん.com : たまごかけごはん専用の料理レシピサービス",
};

export default function Page() {
  return <BookmarkRecipesPage />;
}
