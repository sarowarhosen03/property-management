"use server";
import { auth } from "@/auth";
import { API_URL } from "@/config/site";
import { PropertyType } from "@/lib/Propertyschema";
import { ApiResponse } from "@/types";
import {
  AllBranchResponse,
  BranchByIdResponse,
  Options,
  Property,
} from "@/types/fetchDataTypes";
import { AllUsersResponse, UserByIdResponse } from "@/types/userType";
import { revalidatePath } from "next/cache";

export const getAllProperties = async (options: Options): Promise<any> => {
  const queryString = new URLSearchParams(
    options.searchParams as Record<string, string>,
  );

  const response = await fetch(
    `${API_URL}/properties?${queryString.toString()}&status=published&limit=12`,
    {
      cache: "no-cache",
    },
  );

  if (response.ok) {
    const propertyResponse = await response.json();
    return {
      properties: propertyResponse.data,
      pagination: propertyResponse.pagination,
    };
  }

  throw Error("Properties not found!");
};

export const getPropertyById = async (id: any): Promise<Property> => {
  const response = await fetch(`${API_URL}/properties/${id}`);
  if (!response.ok) {
    throw "Property not found!";
  }
  const property = await response.json();
  return property.data;
};

export const getBranchById = async (id: any): Promise<BranchByIdResponse> => {
  const response = await fetch(`${API_URL}/branches/${id}`);
  if (response.ok) {
    const branch = await response.json();
    return branch;
  }
  throw Error("Branch not found!");
};

export const getUserById = async (id: any): Promise<UserByIdResponse> => {
  const response = await fetch(`${API_URL}/users/${id}`, {
    next: {
      tags: ["user"],
    },
  });
  if (response.ok) {
    const user = await response.json();
    return user;
  }
  throw Error("User not found!");
};

// Private Requesting

export const getAllBrunches = async (): Promise<AllBranchResponse> => {
  const { user } = (await auth()) || {};
  const { token } = user || {};
  const response = await fetch(`${API_URL}/branches`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
    cache: "no-cache",
  });
  if (response.ok) {
    const branches = await response.json();
    return branches.result ? branches : null;
  }
  throw Error("Branches not found!");
};

export const getAllUsers = async (): Promise<AllUsersResponse> => {
  const { user } = (await auth()) || {};
  const { token } = user || {};
  const response = await fetch(`${API_URL}/users`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (response.ok) {
    const users = await response.json();
    return users.result ? users : null;
  }
  throw Error("Users not found!");
};

export const pushPropertyTopById = async (propertyId: string) => {
  const { user } = (await auth()) || {};
  const { token } = user || {};

  if (!token) {
    throw new Error("Authentication token is missing");
  }

  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      lastUpdatedTime: new Date(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update property: ${response.statusText}`);
  }

  return response.json();
};

export async function propertyToPost(
  token: string,
  propertyId: string,
): Promise<ApiResponse<PropertyType>> {
  const response = await fetch(`${API_URL}/properties/${propertyId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status: "published",
      lastUpdatedTime: new Date(),
    }),
  });
  revalidatePath("/[lang]/(dashboard)/dashboard/properties", "layout");
  revalidatePath("/[lang]/(main)/properties", "layout");
  revalidatePath(`/[lang]/dashboard/properties/${propertyId}`);
  return await response.json();
}
