import { API_URL } from "@/config/site";
import { MAX_IMAGE_UPLOAD } from "@/utils/constant";
import { assetsDelete } from "../_utils/assetsDelete";
import { assetsUploads } from "../_utils/assetsUpload";

export default async function updateProperty({
  data,
  token,
  prevImag,
  propertyId,
}: {
  data: any;
  token: string;
  propertyId: string;
  prevImag: any;
}) {
  data.images = data.images.slice(0, MAX_IMAGE_UPLOAD);
  const filesImages = data.images.filter(
    (image: any) => typeof image !== "string",
  );
  const filesImagesIndexs = data.images
    .map((image: any, index: number) =>
      typeof image !== "string" ? index : null,
    )
    .filter((index: number) => index !== null);

  let images = await assetsUploads(filesImages);

  filesImagesIndexs.forEach((imageIndex: any, idx: number) => {
    if (images[idx]) {
      data.images[imageIndex] = images[idx];
    }
  });

  const deletedImages = prevImag.filter(
    (item: any) => !data.images.includes(item),
  );

  if (deletedImages.length) {
    await assetsDelete(deletedImages);
  }
  await assetsDelete(data.images.slice(MAX_IMAGE_UPLOAD));
  data.images = data.images?.slice(0, MAX_IMAGE_UPLOAD);
  if (data._id) {
    data._id = data._id?.trim();
  }
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return await response.json();
}
