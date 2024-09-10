import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Recipe Image";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: { params: { id: string } }) {
  const recipe = await fetch(`http://localhost:3000/recipes/${params.id}`).then(
    (res) => res.json()
  );

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${recipe.image}`}
          alt={recipe.title}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        />
        <div
          style={{
            fontSize: 48,
            color: "black",
            position: "absolute",
            bottom: "10px",
            left: "10px",
            background: "rgba(255, 255, 255, 0.6)",
            padding: "10px",
          }}
        >
          {recipe.title}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
