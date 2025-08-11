import { API_URL } from "@/config/site";
import { MAX_IMAGE_UPLOAD } from "@/utils/constant";
import { assetsDelete } from "../_utils/assetsDelete";
import { assetsUploads } from "../_utils/assetsUpload";

export default async function addProperty({
  data,
  userId,
  token,
}: {
  data: any;
  userId: string;
  token: string;
}) {
  const images = await assetsUploads(data?.images?.slice(0, 20));

  const body = {
    agentId: userId,
    ...data,
    images: images,
  };
  delete body._id;
  if (data?._id) {
    body._id = data._id;
  }
  if (data?.details?.floor) {
    const floorArrays = data?.details.floor.trim().split("/");
    body.details.floorNumber = parseInt(floorArrays[0]);
    body.details.totalFloors = parseInt(floorArrays[1]);
  }

  await assetsDelete(body.images.slice(MAX_IMAGE_UPLOAD));
  body.images = body.images?.slice(0, MAX_IMAGE_UPLOAD);

  if (body._id) {
    body._id = body._id?.trim();
  }

  const response = await fetch(`${API_URL}/properties`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return await response.json();
}
