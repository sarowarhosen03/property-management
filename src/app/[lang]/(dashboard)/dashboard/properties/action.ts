"use server";

import { auth } from "@/auth";
import { API_URL } from "@/config/site";
import { ApiResponse } from "@/types";
import { Property } from "@/types/fetchDataTypes";
import { queryString } from "@/utils/query";
import { SearchParams } from "./page";

export async function getProperties(
  searchParams: SearchParams,
): Promise<ApiResponse<Property[]>> {
  const session = await auth();
  const token = session?.user.token;

  const getQueryString = queryString(searchParams);
  const isAll = ["archive", "draft"].some((i) =>
    getQueryString.includes(i.toLowerCase()),
  );

  const response = await fetch(
    `${API_URL}/properties?${!isAll ? `status=published${getQueryString ? "&" : ""}` : ""}${getQueryString}`.trim(),
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    },
  );

  const responseData = await response.json();

  if (!responseData.success) {
    return responseData.message;
  }

  return responseData;
}

export async function getProperty(
  token: string | null,
  propertyId: string | number,
): Promise<any> {
  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    ...headers,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const responsebody = await response.json();
  return await responsebody.data;
}
