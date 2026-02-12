"use client";
import React, { useEffect, useState } from "react";
import { ISeasonal } from "$/types/types";
import LargeCard from "$/components/cards/LargeCard";
import Heading from "$/components/shared/Heading";
import { useGetTopsQuery } from "$/store/services/top";
import WhatAreYouSkeleton from "../skeleton/WhatAreYouSkeleton";

const Seasonals = () => {
  const { data: seasonalTops, isFetching: isFetchingSeasonalTop } =
    useGetTopsQuery({
      seasonal: true,
    });
  const { data: allSeasonTops, isFetching: isFetchingAllSeasonTop } =
    useGetTopsQuery({
      seasonal: true,
      season: "allSeason",
    });
  const [products, setProducts] = useState<ISeasonal[]>([]);

  useEffect(() => {
    const filter = () => {
      const res: ISeasonal[] = [];
      if (seasonalTops) {
        const winter = seasonalTops.tops.find((top) =>
          top.season.includes("winter"),
        );
        if (winter) res.push({ type: "Winter", product: winter });
        const summer = seasonalTops.tops.find((top) =>
          top.season.includes("summer"),
        );
        if (summer) res.push({ type: "Summer", product: summer });
        const rainy = seasonalTops.tops.find((top) =>
          top.season.includes("rainy"),
        );
        if (rainy) res.push({ type: "Rainy", product: rainy });
      }
      if (allSeasonTops) {
        // find random product and check if it is not similar to what we have in res[];
        const product = allSeasonTops.tops.find(
          (ast) => !res.some((st) => st.product.id === ast.id),
        );
        if (product) res.push({ type: "All Seasons", product });
      }
      setProducts(res);
    };
    if (seasonalTops?.tops && allSeasonTops?.tops) filter();
  }, [allSeasonTops, seasonalTops]);

  const loading = isFetchingSeasonalTop || isFetchingAllSeasonTop;

  const header = {
    title: "Explore Our Seasonal Favorites",
    desc: "Embrace the spirit of the season with our carefully curated collection. Celebrate style and comfort with the perfect seasonal picks!",
  };

  if (loading)
    return <WhatAreYouSkeleton title={header.title} desc={header.desc} />;

  return (
    <div className="mt-10 flex w-full justify-center">
      <div className="max-w-screen-xl">
        <div className="mb-6">
          <Heading title={header.title} desc={header.desc} />
          <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-4">
            {products &&
              products.length > 0 &&
              products.map(({ product, type }, i) => (
                <LargeCard product={product} type={type} key={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Seasonals;
