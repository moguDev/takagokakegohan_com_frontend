// app/api/image/route.js
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const imageUrl = searchParams.get("url"); // クエリパラメータから`url`を取得

  if (!imageUrl) {
    return NextResponse.json(
      { error: "Image URL is required" },
      { status: 400 }
    );
  }

  try {
    // S3から画像をフェッチ
    const response = await fetch(imageUrl);
    console.log(response);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch the image" },
        { status: 500 }
      );
    }

    // 画像データをBufferに変換
    const buffer = await response.arrayBuffer();

    // レスポンスを作成し、ヘッダーにCache-Controlを設定
    const res = new NextResponse(Buffer.from(buffer), {
      headers: {
        "Content-Type": "image/webp", // 必要に応じて画像のContent-Typeを設定
        "Cache-Control": "public, max-age=31536000, immutable", // Cache-Controlの設定
      },
    });

    return res;
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch the image" },
      { status: 500 }
    );
  }
}
