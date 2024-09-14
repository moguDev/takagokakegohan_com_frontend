import { getImageUrl } from "@/lib";
import { axiosInstance } from "@/lib/axiosInstance";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "About Acme";
export const contentType = "image/png";

export default async function OpengraphImage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await axiosInstance.get(`/recipes/${id}`);
  const recipe = res.data;
  const imageUrl = getImageUrl(recipe.image.url);

  return new ImageResponse(
    (
      <div
        className="w-full h-full flex items-center justify-center relative"
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      >
        {imageUrl}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
