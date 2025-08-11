"use server";

import { auth } from "@/auth";
import { API_URL } from "@/config/site";
import { Auth } from "@/types/fetchDataTypes";
import { assetsDelete } from "../../forms/_utils/assetsDelete";

export async function deleteProperty(id: string, images: string[]) {
  try {
    const authInfo: Auth = await auth();
    await Promise.all([
      assetsDelete(images),
      fetch(`${API_URL}/properties/${id}`, {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${authInfo.user?.token || ""}`,
        },
      }),
    ]);
    return {
      success: true,
      message: "Property deleted successfully",
      id,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.message,
    };
  }
}
