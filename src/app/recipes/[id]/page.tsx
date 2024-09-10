import { Metadata } from "next";
import { RecipeDetailsPage } from "./RecipeDetailsPage";
import { axiosInstance } from "@/lib/axiosInstance";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { id } = params;
  const res = await axiosInstance.get(`/recipes/${id}`);
  const recipe = res.data;

  return {
    title: "たまごかけごはん.com",
    description: "たまごかけごはん専用の料理レシピサービス",
    openGraph: {
      title: recipe?.title,
      description: recipe?.body ? recipe.body : "",
      url: `https://たまごかけごはん.com/recipes/${id}`,
      images: [
        {
          url: recipe?.image.url
            ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image.url}`
            : "https://たまごかけごはん.com/images/opengraph-image.png",
          width: 1200,
          height: 630,
          alt: recipe?.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: recipe?.title,
      description: recipe.body || "たまごかけごはん専用の料理レシピサービス",
      images: recipe?.image.url
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image.url}`
        : "https://たまごかけごはん.com/images/opengraph-image.png",
    },
  };
}
export default function Page() {
  return <RecipeDetailsPage />;
}
