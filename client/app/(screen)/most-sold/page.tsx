"use client";
import React, { useEffect, useState } from "react";
import { useGetBottomsQuery } from "$/store/services/bottom";
import { useGetTopsQuery } from "$/store/services/top";
import { ITop, IBottom } from "$/types/api";
import LoadingScreen from "$/components/shared/LoaderScreen";
import RegularCard from "$/components/cards/RegularCard";

const Page = () => {
  // TODO: Make limit dynamic
  const { data: tops, isFetching: isFetchingTops } = useGetTopsQuery({
    sort: "most-sold",
  });
  const { data: bottoms, isFetching: isFetchingBottoms } = useGetBottomsQuery({
    sort: "most-sold",
  });

  const [product, setProduct] = useState<(ITop | IBottom)[]>();

  const isLoading = isFetchingBottoms || isFetchingTops;
  useEffect(() => {
    if (tops?.tops && bottoms?.bottoms) {
      setProduct(
        [...(tops?.tops ?? []), ...(bottoms?.bottoms ?? [])].sort(
          (x, y) => y.sold - x.sold,
        ),
      );
    }
  }, [tops?.tops, bottoms?.bottoms]);
  return (
    <div>
      <div className="sectionTwo px-4 pb-14">
        <div className="ml-5 md:ml-10">
          <h1 className="mt-2 text-8xl uppercase max-md:text-6xl">Most Sold</h1>
          <p className="text-gray-500">
            Dive into our most sold items. Order our most sold items and get a
            bright look!
          </p>
        </div>

        <div className="mb-8 flex flex-wrap items-center justify-center"></div>
        <div className="grid place-content-center">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {isLoading ? (
              <LoadingScreen />
            ) : product && product?.length > 0 ? (
              product.map((product) => (
                <RegularCard key={product?.id as any} product={product} />
              ))
            ) : (
              <div className="grid h-[60vh] w-[90vw] place-items-center">
                No data available
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
