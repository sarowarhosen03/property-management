import { ADMIN_ROLES } from "@/utils/constant";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handlerizeString(str: string): string {
  return str.toLowerCase().replace(" ", "-");
}

export function isAdmin(role: string): boolean {
  return ADMIN_ROLES.includes(role);
}

export function decodeURL(url: string): string {
  return decodeURIComponent(url);
}
