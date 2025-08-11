export const withWatermark = async (images) => {
  const bufferImagesWithWatermark = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/watermark`,
    {
      method: "POST",
      body: JSON.stringify(images),
    },
  );
  const watermarkedImages = await bufferImagesWithWatermark.json();
  return watermarkedImages;
};
