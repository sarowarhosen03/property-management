"use client";
import { increaseLike } from "@/lib/propertyAnalitics";
import { Property } from "@/types/fetchDataTypes";
import {
  addToFavorite,
  isFavorite,
  removeFavorite,
} from "@/utils/locals/favorites";
import numberToAbbreviation from "@/utils/numberToAbbreviation";
import Image from "next/image";
import { useEffect, useState } from "react";
import { showToast } from "../../toaster/toaster";

export default function Likes({
  property,
  dict,
}: {
  property: Property;
  dict: string;
}) {
  const [isFav, setIsFav] = useState(false);
  const { likes, _id } = property;
  const [likeCount, setLikeCount] = useState(likes);

  const handleAddToFavorite = () => {
    const liked = addToFavorite(property);
    if (liked) {
      setIsFav(true);
      showToast({
        message: `Favorite add success`,
        type: "success",
        title: "Success",
      });
    }
  };
  const handleRemoveFavorite = () => {
    const liked = removeFavorite(_id);
    if (liked) {
      setIsFav(false);
      showToast({
        message: `Favorite remove success`,
        type: "warning",
        title: "Success",
      });
    }
  };

  useEffect(() => {
    setIsFav(isFavorite(_id));
  }, [_id]);

  const updateLikes = async (isFav: boolean) => {
    try {
      const addedView = await increaseLike(_id, isFav, property.agentId._id);

      if (addedView?.status) {
        setLikeCount((prev: number) => (isFav ? prev - 1 : prev + 1));
      }
    } catch (error) {
      console.error("Failed to update views", error);
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div
          className="2xl:h6 relative mr-1 h-4 w-4 2xl:mr-2 2xl:w-6"
          onClick={async () => {
            isFav ? handleRemoveFavorite() : handleAddToFavorite();
            await updateLikes(isFav);
          }}
        >
          <Image
            src={isFav ? "/svgs/favorite-fill.svg" : "/svgs/favorite.svg"}
            width={24}
            title={dict}
            height={24}
            alt={"heart"}
            className="2xl:h6 h-4 w-4 2xl:w-6"
          />
        </div>
        {numberToAbbreviation(likeCount)}
      </div>
    </>
  );
}
