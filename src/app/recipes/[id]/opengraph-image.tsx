import { getImageUrl } from "@/lib";
import { axiosInstance } from "@/lib/axiosInstance";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const runtime = "nodejs";
export const alt = "About Acme";
export const contentType = "image/webp";

export default async function OpengraphImage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const res = await axiosInstance.get(`/recipes/${id}`);
  const recipe = res.data;
  const imageUrl = getImageUrl(recipe.image.url);

  try {
    const recipeImageResponse = imageUrl
      ? await fetch(imageUrl!)
      : DefaultRecipeImage();
    const imageBuffer = await recipeImageResponse.arrayBuffer();
    const convertedImageBuffer = await sharp(Buffer.from(imageBuffer))
      .png()
      .toBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            background: "#F59E0B",
            padding: "20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              width: "50%",
              height: "100%",
              borderTopLeftRadius: "32px",
              borderBottomLeftRadius: "32px",
              backgroundImage: `url(data:image/png;base64,${convertedImageBuffer.toString(
                "base64"
              )})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundAttachment: "fixed",
            }}
          />
          <div
            style={{
              background: "#fefef5",
              display: "flex",
              width: "50%",
              height: "100%",
              padding: "25px",
              flexDirection: "column",
              justifyContent: "center",
              borderTopRightRadius: "32px",
              borderBottomRightRadius: "32px",
            }}
          >
            <img
              src="http://localhost:3030/images/app-logo.png"
              alt="logo"
              style={{ width: "300px" }}
            />
            <h1
              style={{
                maxWidth: "100%",
                display: "flex",
                fontWeight: "700",
                fontSize: "48px",
              }}
            >
              {recipe.title}
            </h1>
            <p
              style={{
                width: "100%",
                fontWeight: "400",
                fontSize: "32px",
                color: "#6B7280",
                textAlign: "right",
                alignSelf: "flex-end",
              }}
            >
              by {recipe.user.nickname}
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error("画像処理中のエラー:", error);
    throw new Error("画像の生成に失敗しました");
  }
}

const DefaultRecipeImage = () => {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#E5E7EB",
          color: "#9CA3AF",
          fontSize: "24px",
          padding: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        画像がありません。
      </div>
    ),
    { width: 630, height: 630 }
  );
};
