"use client";
import React, { useEffect, useState } from "react";
import { IBottom, ITop } from "$/types/api";
import { useGetTopsQuery } from "$/store/services/top";
import { useGetBottomsQuery } from "$/store/services/bottom";
import RegularCard from "$/components/cards/RegularCard";
import LoadingScreen from "$/components/shared/LoaderScreen";

const NewArrivals = () => {
  const { data: tops, isFetching: isFetchingTop } = useGetTopsQuery({
    newArrival: true,
  });
  const { data: bottoms, isFetching: isFetchingBottoms } = useGetBottomsQuery({
    newArrival: true,
  });
  const [arrival, setArrival] = useState<(ITop | IBottom)[]>([]);

  useEffect(() => {
    if (tops?.tops && bottoms?.bottoms)
      setArrival([...tops.tops, ...bottoms.bottoms]);
  }, [tops, bottoms]);

  const isLoading = isFetchingBottoms || isFetchingTop;
  return (
    <div className="sectionTrending bg-background py-12">
      <div className="ml-5 md:ml-10">
        <h1 className="mt-2 text-8xl uppercase max-md:text-6xl">
          New Arrivals
        </h1>
        <p className="text-gray-500">
          Step into the spotlight with our new arival collection.Elevate your
          wardrobe with the most sought-after styles!
        </p>
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-center"></div>
      <div className="grid place-content-center">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {isLoading ? (
            <LoadingScreen width={"w-[99vw]"} />
          ) : (
            arrival?.length > 0 &&
            arrival.map((product, i) => (
              <RegularCard product={product} key={i} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
