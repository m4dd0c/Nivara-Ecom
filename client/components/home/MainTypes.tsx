"use client";
import LargeCard from "$/components/cards/LargeCard";
import Heading from "$/components/shared/Heading";
import { useGetFeaturedQuery } from "$/store/services/home";
import WhatAreYouSkeleton from "../skeleton/WhatAreYouSkeleton";

const MainTypes = () => {
  const { data, isFetching } = useGetFeaturedQuery();
  if (isFetching) return <WhatAreYouSkeleton />;
  return (
    <div className="flex w-full justify-center">
      <div className="max-w-7xl">
        <div className="mb-6">
          <Heading
            title="What are you looking for?"
            desc="Explore our wide range of stylish and comfortable clothing options.Choose from various categories and find the perfect outfit for every occasion."
          />
          <div className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-4">
            {data &&
              data?.data.map((product, i) => (
                <LargeCard product={product} key={i} type={product?.name} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainTypes;
