"use server";
import { auth } from "@/auth";
import { API_URL } from "@/config/site";
import { ContactType } from "@/lib/ContactSchema";
import { ProfileFormType } from "@/lib/ProfileSchema";
import { revalidateByTag } from "@/lib/revalidateCache";

type InboxType = {
  agentId: String;
  propertyId: String;
  fullName: String;
  email: String;
  phone: String;
  comment: String;
  isRead: Boolean;
};

export const createInboxMutation = async (data: InboxType) => {
  const response = await fetch(`${API_URL}/inboxes`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateByTag("inboxes");
  return await response.json();
};

export const getInboxes = async (token: string) => {
  const response = await fetch(`${API_URL}/inboxes`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: ["inboxes"],
    },
  });
  return await response.json();
};

export const createContactMutation = async (data: ContactType) => {
  const response = await fetch(`${API_URL}/contacts`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  revalidateByTag("contact");
  return await response.json();
};

// Update Avatar or create avatar
export const updateAndCreateAvatarMutation = async (body: any) => {
  const { user } = (await auth()) || {};
  const { token, id } = user || {};
  ``;

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({
      ...body,
      userId: id,
    }),
    next: {
      tags: ["users"],
    },
  });
  revalidateByTag("user");

  if (response.ok) {
    const json = await response.json();

    return json.data;
  }
};
export const updateUserProfile = async (body: ProfileFormType) => {
  const { user } = (await auth()) || {};
  const { token, id } = user || {};
  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "content-type": "application/json",
    },
    body: JSON.stringify({ ...body, userId: id }),
    next: {
      tags: ["users"],
    },
  });
  revalidateByTag("user");
  const json = await response.json();
  if (json.code === 200) return json.data;

  throw json;
};
