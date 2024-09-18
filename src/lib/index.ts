export const getImageUrl = (imagePath: string | null) => {
  if (imagePath === null) {
    return imagePath;
  } else {
    // if (process.env.NODE_ENV === "production")
    return `/api/image?url=${encodeURIComponent(imagePath as string)}`;
    // return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imagePath}`;
  }
};
