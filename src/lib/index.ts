function removeUrlParameters(url: string | null): string | null {
  if (url === null) {
    return url;
  } else {
    const index = url.indexOf("?");
    return index !== -1 ? url.substring(0, index) : url;
  }
}

export const getImageUrl = (imagePath: string | null) => {
  // if (imagePath === null) {
  return removeUrlParameters(imagePath as string);
  // } else {
  // if (process.env.NODE_ENV === "production")
  // return `/api/image?url=${encodeURIComponent(imagePath as string)}`;
  // return `${process.env.NEXT_PUBLIC_BACKEND_URL}${imagePath}`;
  // }
};
