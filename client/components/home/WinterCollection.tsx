"use client";
import React, { useEffect, useState } from "react";
import { Button } from "$/components/ui/button";
import { IBottom, ITop } from "$/types/api";
import { normalizeString } from "$/lib/utils/matcher";
import Heading from "$/components/shared/Heading";
import { useGetTopsQuery } from "$/store/services/top";
import { useGetBottomsQuery } from "$/store/services/bottom";
import TrendingCollectionSkeleton from "../skeleton/TrendingCollectionSkeleton";
import RegularCard from "../cards/RegularCard";

const WinterCollection = () => {
  const { data: tops, isFetching: isFetchingTop } = useGetTopsQuery({
    trending: true,
  });
  const { data: bottoms, isFetching: isFetchingBottoms } = useGetBottomsQuery({
    trending: true,
  });
  const [trending, setTrending] = useState<(ITop | IBottom)[]>([]);

  useEffect(() => {
    if (tops && tops.tops && bottoms && bottoms.bottoms)
      setTrending([...tops.tops, ...bottoms.bottoms]);
  }, [tops, bottoms]);

  const categories = ["Sweater", "Sweatshirt", "Hoodie", "Jacket"];
  const loading = isFetchingBottoms || isFetchingTop;
  const [filteredCollection, setFilteredCollection] = useState(trending);
  const [selectedType, setSelectedType] = useState("Jacket");
  const [visibleCount, setVisibleCount] = useState(4); // default to 4 items

  useEffect(() => {
    const category = (selectedType: string) => {
      const filteredData = trending.filter((item) =>
        item.style.some(
          (style) => normalizeString(style) === normalizeString(selectedType),
        ),
      );
      setFilteredCollection(filteredData);
    };
    category(selectedType);
  }, [selectedType, trending]);

  const visibleItems = filteredCollection.slice(0, visibleCount);

  if (loading)
    return <TrendingCollectionSkeleton title="Winter Trending Collection" />;

  return (
    <div className="sectionTrending bg-background px-4 py-12">
      <Heading
        title="Winter Trending Collection"
        desc="Step into the spotlight with our trending collection.Elevate your wardrobe with the most sought-after styles!
"
      />
      <div className="mb-8 flex flex-wrap items-center justify-center">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((type) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              onClick={() => {
                setSelectedType(type);
                setVisibleCount(4); // Reset visible count when switching types
              }}
            >
              {type}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid place-content-center">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
          {visibleItems &&
            visibleItems?.map((product) => (
              <RegularCard product={product} key={product?.id as any} />
            ))}
        </div>
      </div>

      {filteredCollection.length > 4 && (
        <div className="mt-6 flex justify-center gap-4">
          {filteredCollection.length > visibleCount && (
            <Button
              onClick={() => setVisibleCount((prev) => prev + 4)}
              variant="outline"
            >
              Show More
            </Button>
          )}
          {visibleCount > 4 && (
            <Button onClick={() => setVisibleCount(4)} variant="outline">
              Show Less
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default WinterCollection;
