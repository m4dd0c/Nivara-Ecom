import React from "react";
import { Skeleton } from "$/components/ui/skeleton";
import Heading from "$/components/shared/Heading";
const NewArrivalsSkeleton = () => {
  return (
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
            Stylish, Comfortable, and Perfect for every occasion. Explore a wide
            range of T-shirts, Shirts, Cargos, and Joggers designed to elevate
            your wardrobe. Stay ahead in style with premium quality and
            unbeatable prices.
          </p>
        </div>
        <div className="removeScrollbar flex w-full justify-start overflow-scroll sm:pl-10">
          {[
            Array.from({ length: 10 }, (_, index) => {
              return (
                <Skeleton
                  className="mr-4 h-[300px] min-w-[230px]"
                  key={index}
                />
              );
            }),
          ]}
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsSkeleton;
