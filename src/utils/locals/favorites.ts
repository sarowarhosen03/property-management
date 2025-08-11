import { Property } from "@/types/fetchDataTypes";

const NEXT_PUBLIC_FAVORITES = process.env.NEXT_PUBLIC_FAVORITES!;
export const addToFavorite = (property: Property): boolean => {
  try {
    const favorites = getAllFavorites();
    favorites.push(property);
    localStorage.setItem(NEXT_PUBLIC_FAVORITES, JSON.stringify(favorites));

    return true;
  } catch {
    return false;
  }
};

export const removeFavorite = (id: string): boolean => {
  try {
    const favorites = getAllFavorites().filter((fav) => fav._id !== id);
    localStorage.removeItem(NEXT_PUBLIC_FAVORITES);
    localStorage.setItem(NEXT_PUBLIC_FAVORITES, JSON.stringify(favorites));
    return true;
  } catch {
    return false;
  }
};

export const isFavorite = (id: String) => {
  const favorites = getAllFavorites();
  const found = favorites?.find((fav) => fav?._id === id);
  if (found && found?._id) {
    return true;
  }
  return false;
};

export const getAllFavorites = (): Property[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const favoritesString = localStorage.getItem(NEXT_PUBLIC_FAVORITES);
  try {
    return favoritesString ? JSON.parse(favoritesString) : [];
  } catch (err) {
    // console.error(err);
    return [];
  }
};
