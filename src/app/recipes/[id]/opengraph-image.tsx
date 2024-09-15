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
  // recipe.image.url が null または undefined の場合、デフォルト画像を使用
  const imageUrl = getImageUrl(recipe.image.url);

  try {
    // 画像を取得
    const imageResponse = imageUrl
      ? await fetch(imageUrl!)
      : DefaultRecipeImage();
    const imageBuffer = await imageResponse.arrayBuffer();
    const convertedImageBuffer = await sharp(Buffer.from(imageBuffer))
      .png()
      .toBuffer();

    return new ImageResponse(
      (
        <div
          style={{
            background: "#FCD34D",
            padding: "10px",
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
              borderTopLeftRadius: "20px",
              borderBottomLeftRadius: "20px",
              backgroundImage: `url(data:image/png;base64,${convertedImageBuffer.toString(
                "base64"
              )})`,
              backgroundSize: "cover", // 画像を要素に合わせて拡大・縮小
              backgroundPosition: "center", // 中心を基準に切り抜き
              backgroundRepeat: "no-repeat", // 画像の繰り返しを無効化
            }}
          />
          <div
            style={{
              background: "#fefef5",
              display: "flex",
              width: "50%",
              height: "100%",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              borderTopRightRadius: "20px",
              borderBottomRightRadius: "20px",
            }}
          >
            <h1
              className="zen-kaku-gothic-new-bold"
              style={{
                maxWidth: "100%",
                display: "flex",
                fontWeight: "bolder",
                fontSize: "40px",
                fontFamily: "Noto Sans JP, sans-serif",
              }}
            >
              {recipe.title}
            </h1>
            <p
              style={{
                maxWidth: "100%",
                display: "flex",
                fontWeight: "bolder",
                fontSize: "32px",
                color: "#6B7280",
                fontFamily: "Noto Sans JP, sans-serif",
              }}
            >
              {recipe.user.nickname}
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
