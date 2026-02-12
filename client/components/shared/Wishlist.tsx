"use client";

import { getLocalStorage } from "$/lib/utils/localStorage";
import { BookmarkFilledIcon, BookmarkIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";

const Wishlist = ({ id }: { id?: string }) => {
  const [favorite, setFavorite] = useState(false);

  const handleWishlist = () => {
    if (!id) return;
    const store: undefined | string[] = getLocalStorage("wishlist");
    let newStore;
    // wishlist is undefined means not available in localStorage
    if (!store) {
      // first item of the wishlist
      newStore = [id];
    } else {
      if (store.includes(id)) {
        // remove from wishlist
        newStore = store.filter((storeId) => id !== storeId);
      } else {
        // append to wishlist
        newStore = [...store, id];
      }
    }
    localStorage.setItem("wishlist", JSON.stringify(newStore));
    setFavorite(newStore?.includes(id));
  };

  useEffect(() => {
    if (id) {
      const wishlist = getLocalStorage("wishlist");
      setFavorite(wishlist?.includes(id));
    }
  }, [favorite, id]);

  return (
    <button onClick={() => handleWishlist()}>
      {favorite ? (
        <BookmarkFilledIcon className="size-6" />
      ) : (
        <BookmarkIcon className="size-6" />
      )}
    </button>
  );
};

export default Wishlist;
