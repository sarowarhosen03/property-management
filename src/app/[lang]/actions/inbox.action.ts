import { auth } from "@/auth";
import { API_URL } from "@/config/site";

export const deleteInboxAction = async (inboxId: string) => {
  const session = await auth();
  const { user } = session || {};

  const response = await fetch(`${API_URL}/inboxes/${inboxId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user?.token}`,
      "content-type": "application/json",
    },
    next: {
      tags: ["inboxes"],
    },
  });
  return await response.json();
};
