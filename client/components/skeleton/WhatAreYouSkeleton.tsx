import React from "react";
import { Skeleton } from "$/components/ui/skeleton";
import Heading from "$/components/shared/Heading";

const WhatAreYouSkeleton = ({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) => {
  return (
    <div className="mt-10">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-6">
          <Heading
            title={title ?? "What are you looking for?"}
            desc={
              desc ??
              `Explore our wide range of stylish and comfortable clothing options.${"\n"}Choose from various categories and find the perfect outfit for every occasion.`
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
          <Skeleton className="mx-auto block h-[300px] w-full rounded-lg sm:h-[480px]" />
          <Skeleton className="mx-auto block h-[300px] w-full rounded-lg sm:h-[480px]" />
          <Skeleton className="mx-auto block h-[300px] w-full rounded-lg sm:h-[480px]" />
          <Skeleton className="mx-auto block h-[300px] w-full rounded-lg sm:h-[480px]" />
        </div>
      </div>
    </div>
  );
};

export default WhatAreYouSkeleton;
