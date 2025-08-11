"use server";
import { API_URL } from "@/config/site";
import { isArray } from "lodash";

export async function getSpacialOffers({
  category,
  type,
  minPrice,
  maxPrice,
  location,
}: {
  category: string;
  type: string;
  location: string;
  minPrice?: number;
  maxPrice?: number;
}) {
  try {
    const propetyis = await fetch(
      `${API_URL}/properties?category=${category}&type=${type}&city=${location}&status=published`,
      { cache: "no-cache" },
    );
    const res = await propetyis.json();
    return isArray(res?.data) ? res : { data: [] };
  } catch (error) {
    console.log(`error while fetching properties`);

    return {
      error: "error while fetching properties",
      data: [],
    };
  }
}
