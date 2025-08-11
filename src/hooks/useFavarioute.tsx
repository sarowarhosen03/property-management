"use client";

import { FavoriteContext } from "@/context";
import { useContext } from "react";

export default function useFavarioute() {
  return useContext(FavoriteContext);
}
