export const getImageUrl = (imagePath: string | null) => {
  // if (imagePath === null) return imagePath;
  // if (process.env.NODE_ENV === "production") return imagePath;
  // return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imagePath}`;
  return `/api/image?url=${encodeURIComponent(imagePath as string)}`;
};
