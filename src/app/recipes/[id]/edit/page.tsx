import { Metadata } from "next";
import { RecipesEditForm } from "./RecipeEditForm";

export const metadata: Metadata = {
  title:
    "レシピを編集 | たまごかけごはん.com : たまごかけごはん専用の料理レシピサービス",
};

export default function RecipeEditPage() {
  return <RecipesEditForm />;
}
