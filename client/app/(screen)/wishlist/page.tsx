"use client";
import React, { useEffect, useState, useMemo } from "react";
import RegularCard from "$/components/cards/RegularCard";
import { getLocalStorage } from "$/lib/utils/localStorage";
import { IBottom, ITop } from "$/types/api";
import { useFetchWishlistMutation } from "$/store/services/wishlist";
import LoadingScreen from "$/components/shared/LoaderScreen";

const Page = () => {
  const [hasMounted, setHasMounted] = useState(false);
  const [ids, setIds] = useState<string[]>([]);
  const [fetchWishlist, { data: wishlist, isLoading }] =
    useFetchWishlistMutation();

  useEffect(() => {
    setHasMounted(true);
    const storedIds = getLocalStorage("wishlist");
    setIds(storedIds);
  }, []);

  useEffect(() => {
    if (hasMounted && ids.length > 0) {
      fetchWishlist({ ids });
    }
  }, [hasMounted, ids, fetchWishlist]);

  if (!hasMounted) return null;

  if (isLoading) return <LoadingScreen />;

  return (
    <div className="flex h-full flex-col text-sm">
      <h1 className="my-8 text-center text-3xl uppercase">
        Wishlist ({wishlist?.length || 0})
      </h1>
      <div className="flex min-h-[75vh] flex-wrap gap-2 p-2 max-md:justify-center md:p-8">
        {wishlist && wishlist.length > 0 ? (
          wishlist.map((product, i: number) => (
            <RegularCard product={product} key={i} />
          ))
        ) : (
          <div className="flex w-full justify-center text-lg italic text-gray-500">
            Your wishlist is empty.
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
