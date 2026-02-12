import React from "react";

const OrdersSkeleton = () => {
  return (
    <>
      {/* Tabs Skeleton */}
      <div className="mb-6 w-full">
        <div className="grid grid-cols-3 gap-4">
          <div className="h-8 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-8 animate-pulse rounded-md bg-gray-300"></div>
          <div className="h-8 animate-pulse rounded-md bg-gray-300"></div>
        </div>
      </div>

      {/* Orders Grid Skeleton */}
      <div className="mx-auto my-10 px-4 max-lg:w-1/2 max-md:w-3/4 max-sm:w-full">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="flex animate-pulse flex-col items-center justify-between rounded-lg bg-gray-200 p-4 shadow-sm"
            >
              <div className="mb-4 h-32 w-full rounded-md bg-gray-300"></div>
              <div className="mb-2 h-6 w-3/4 rounded-md bg-gray-300"></div>
              <div className="mb-2 h-6 w-2/3 rounded-md bg-gray-300"></div>
              <div className="h-6 w-full rounded-md bg-gray-300"></div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrdersSkeleton;
