import React from "react";
import { Skeleton } from "$/components/ui/skeleton";
import Heading from "$/components/shared/Heading";

const PeopleLoveMostSkeleton = () => {
  return (
    <div className="mb-12 mt-16 p-4">
      <div className="">
        <div className="mb-4">
          <Heading
            title="Have a look on what people love most !!!"
            desc="Discover our latest collection featuring trendy styles and fresh designs.Don't miss out on the newest additions to our store!"
          />
        </div>

        <div className="removeScrollbar flex w-full justify-start overflow-scroll">
          {[
            Array.from({ length: 16 }, (_, index) => {
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

export default PeopleLoveMostSkeleton;
