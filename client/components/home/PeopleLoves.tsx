"use client";
import React, { useEffect, useState } from "react";
import { IBottom, ITop } from "$/types/api";
import MiniCard from "$/components/cards/MiniCard";
import Heading from "$/components/shared/Heading";
import { useGetTopsQuery } from "$/store/services/top";
import { useGetBottomsQuery } from "$/store/services/bottom";
import PeopleLoveMostSkeleton from "../skeleton/PeopleLoveSkeleton";

const PeopleLoves = () => {
  const { data: tops, isFetching: isFetchingTop } = useGetTopsQuery({
    sort: "popular",
    limit: 7,
  });
  const { data: bottoms, isFetching: isFetchingBottoms } = useGetBottomsQuery({
    sort: "popular",
    limit: 7,
  });
  const [products, setProducts] = useState<(ITop | IBottom)[]>([]);

  useEffect(() => {
    if (tops?.tops && bottoms?.bottoms) {
      let data = [...tops.tops, ...bottoms.bottoms];
      data = data.sort((a, b) => b.views - a.views);
      setProducts(data);
    }
  }, [bottoms?.bottoms, tops?.tops]);

  const loading = isFetchingBottoms || isFetchingTop;
  if (loading) return <PeopleLoveMostSkeleton />;
  return (
    <div className="sectionTwo mt-12 px-4 pb-10">
      <Heading
        title="Have a look on what people love most !!!"
        desc="Discover our latest collection featuring trendy styles and fresh designs.Don't miss out on the newest additions to our store!"
      />
      <div className="items-top flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
        <div className="removeScrollbar items-top justify-left flex size-full gap-4 overflow-scroll sm:gap-6">
          {products &&
            products?.length > 0 &&
            products.map((product, i) => (
              <MiniCard product={product} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleLoves;
