import { getImageUrl } from "@/lib";
import { axiosInstance } from "@/lib/axiosInstance";
import { ImageResponse } from "next/og";
import sharp from "sharp";

export const runtime = "nodejs";
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

  const endpoint = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  endpoint.searchParams.set("family", "Zen Kaku Gothic New");
  endpoint.searchParams.set(
    "key",
    process.env.NEXT_PUBLIC_GOOGLE_FONTS_API_KEY as string
  );
  const info = await fetch(endpoint).then((res) => res.json());
  console.log(info);

  const fontResponse = await fetch(info.items[0].files["900"]);
  const fontBuffer = await fontResponse.arrayBuffer();

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
            background: "#FBBF24",
            color: "#333333",
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
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              borderTopLeftRadius: "32px",
              borderBottomLeftRadius: "32px",
              overflow: "hidden",
            }}
          >
            <img
              src={`data:image/png;base64,${convertedImageBuffer.toString(
                "base64"
              )}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
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
            <p style={{ fontSize: "32px", lineHeight: "2px" }}>
              たまごかけごはん<span style={{ color: "#D97706" }}>.</span>com
            </p>
            <h1
              style={{
                color: "2a2a2a",
                maxWidth: "100%",
                display: "flex",
                fontWeight: "700",
                fontSize: "56px",
              }}
            >
              {recipe.title}
            </h1>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end", // ここで右寄せ
              }}
            >
              <p
                style={{
                  fontWeight: "400",
                  fontSize: "28px",
                  color: "#6B7280",
                  lineHeight: "2px",
                }}
              >
                by {recipe.user.nickname}
              </p>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Zen_Kaku_Gothic_New",
            data: fontBuffer,
          },
        ],
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
