import React from "react";
import { Skeleton } from "$/components/ui/skeleton";
import Heading from "$/components/shared/Heading";

const TrendingCollectionSkeleton = ({
  title,
  desc,
}: {
  title?: string;
  desc?: string;
}) => {
  return (
    <div className="mb-12 mt-16 p-4">
      <div className="mx-auto max-w-screen-xl">
        <div className="mb-4">
          <Heading
            title={title ?? "Trending Collection"}
            desc={
              desc ??
              `Step into the spotlight with our trending collection.${"\n"}Elevate your wardrobe with the most sought-after styles!`
            }
          />
        </div>
        <div className="mx-auto flex max-w-[500px] gap-2">
          <Skeleton className="h-[36px] w-full rounded-lg" />
          <Skeleton className="h-[36px] w-full rounded-lg" />
          <Skeleton className="h-[36px] w-full rounded-lg" />
          <Skeleton className="h-[36px] w-full rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-4">
          <Skeleton className="mx-auto h-[320px] w-full rounded-lg sm:h-[420px]" />
          <Skeleton className="mx-auto h-[320px] w-full rounded-lg sm:h-[420px]" />
          <Skeleton className="mx-auto h-[320px] w-full rounded-lg sm:h-[420px]" />
          <Skeleton className="mx-auto h-[320px] w-full rounded-lg sm:h-[420px]" />
        </div>
      </div>
    </div>
  );
};

export default TrendingCollectionSkeleton;
