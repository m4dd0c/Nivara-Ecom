"use client";
import React, { useEffect, useState } from "react";
import { IBottom, ITop } from "$/types/api";
import MiniCard from "$/components/cards/MiniCard";
import Heading from "$/components/shared/Heading";
import { useGetTopsQuery } from "$/store/services/top";
import { useGetBottomsQuery } from "$/store/services/bottom";
import NewArrivalsSkeleton from "../skeleton/NewArrivalsSkeleton";

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

  const loading = isFetchingBottoms || isFetchingTop;
  if (loading) return <NewArrivalsSkeleton />;
  return (
    <div>
      <div className="sectionTwo px-4 pb-14">
        <Heading
          title="Have a look on New Arrivals"
          desc="Discover our latest collection featuring trendy styles and fresh designs.Don't miss out on the newest additions to our store!"
        />

        <div className="items-top flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-16">
          <div className="max-w-[300px] text-center sm:text-left">
            <h1 className="text-xl font-semibold sm:text-2xl">
              New <br />
              <span className="mt-2 bg-primary px-4 py-1 text-xl font-bold text-background sm:text-2xl">
                Arrivals
              </span>
            </h1>
            <p className="mt-4 text-sm text-foreground/70 sm:text-base">
              Stylish, Comfortable, and Perfect for every occasion. Explore a
              wide range of T-shirts, Shirts, Cargos, and Joggers designed to
              elevate your wardrobe. Stay ahead in style with premium quality
              and unbeatable prices.
            </p>
          </div>
          <div className="removeScrollbar items-top justify-left flex size-full gap-4 overflow-scroll sm:gap-6">
            {arrival &&
              arrival?.length > 0 &&
              arrival.map((product, i) => (
                <MiniCard product={product} key={i} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
