"use client";
import { FavoriteContext } from "@/context";
import { Property } from "@/types/fetchDataTypes";
import React, { useEffect, useState } from "react";

export default function FvariouteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [fav, setFav] = useState<Property[]>([]);

  useEffect(() => {
    const favoritesString = localStorage.getItem(
      process.env.NEXT_PUBLIC_FAVORITES!,
    );
    setFav(favoritesString ? JSON.parse(favoritesString) : []);
  }, []);

  return (
    <FavoriteContext.Provider value={[fav, setFav]}>
      {children}
    </FavoriteContext.Provider>
  );
}
