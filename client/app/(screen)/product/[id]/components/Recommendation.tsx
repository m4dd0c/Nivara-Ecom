"use client";
import { useGetRecommendationsQuery } from "$/store/services/recommendation";
import MiniCard from "$/components/cards/MiniCard";

const Recommendation = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetRecommendationsQuery({
    id,
    sortBy: "popular",
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="pb-4 text-center text-2xl uppercase">
          You may be Interested in
        </h1>
        <div className="grid place-content-center">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-64 w-full animate-pulse rounded-lg bg-muted"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !data || data.data.length === 0) {
    return null;
  }

  return (
    <div className="p-4">
      <h1 className="pb-4 text-center text-2xl uppercase">
        You may be Interested in
      </h1>
      <div>
        <div className="grid place-content-center">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
            {data.data.map((product) => (
              <MiniCard product={product} key={product.id as any} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
