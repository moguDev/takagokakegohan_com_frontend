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
  params: { name: string };
}) {
  const { name } = params;
  const res = await axiosInstance.get(`/users/${name}`);
  const userProfile = res.data;
  const imageUrl = getImageUrl(userProfile.avatar.url);

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
            background: "#fcfcf3",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{ height: 20, backgroundColor: "#FBBF24", width: "100%" }}
          />
          <h1
            style={{
              fontSize: 32,
              flex: 1,
              maxWidth: "80%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {userProfile.nickname}
          </h1>
          <div
            style={{ height: 20, backgroundColor: "#FBBF24", width: "100%" }}
          />
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
