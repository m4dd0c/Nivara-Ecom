import React from "react";
import { Skeleton } from "$/components/ui/skeleton";

const WinterCollectionSkeleton = () => {
  return (
    <div>
      <div className="mb-12 mt-16 p-4">
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-4">
            <div className="">
              <Skeleton className="mx-auto mb-4 h-[46px] w-full rounded-md sm:w-[360px]" />
              <Skeleton className="mx-auto mb-2 h-[18px] w-full rounded-sm sm:w-[460px]" />
              <Skeleton className="mx-auto h-[18px] w-full rounded-sm sm:w-[460px]" />
            </div>
          </div>
          <div className="mx-auto flex max-w-[500px] gap-2">
            <Skeleton className="h-[36px] w-full rounded-lg" />
            <Skeleton className="h-[36px] w-full rounded-lg" />
            <Skeleton className="h-[36px] w-full rounded-lg" />
            <Skeleton className="h-[36px] w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WinterCollectionSkeleton;
