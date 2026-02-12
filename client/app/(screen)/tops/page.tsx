"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "$/lib/utils/query-string";
import LoadingScreen from "$/components/shared/LoaderScreen";
import { useGetTopsQuery } from "$/store/services/top";
import RegularCard from "$/components/cards/RegularCard";
import { ProductHeader } from "$/components/shared/ProductHeader";
import { Sidebar } from "$/components/shared/Sidebar";

const Page = ({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) => {
  const paramsObj = React.use(searchParams);
  const params = useSearchParams();
  const pathname = usePathname();
  const query = params.get("q");
  const router = useRouter();
  const [input, setInput] = useState(query || "");
  const [isClose, setIsClose] = useState<boolean>(true);
  // Fetch data using the client-side query hook
  const {
    data: topsData,
    refetch,
    isLoading,
  } = useGetTopsQuery({ ...paramsObj });

  useEffect(() => {
    const delay = 1000;
    const debounce = setTimeout(() => {
      if (input) {
        const url = formUrlQuery({
          params: params.toString(),
          key: "q",
          value: input,
        });
        router.push(url, { scroll: false });
        if (input.length >= 3) refetch();
      } else {
        if (query) {
          const url = removeKeysFromQuery({
            params: params.toString(),
            keysToRemove: ["q"],
          });
          router.push(url, { scroll: false });
        }
      }
    }, delay);
    return () => clearTimeout(debounce);
  }, [input, params, router, pathname, refetch, query]);

  useEffect(() => {
    refetch();
  }, [paramsObj, refetch]);

  const tops = topsData?.tops || [];

  return (
    <div className="flex">
      <Sidebar type={"top"} setIsClose={setIsClose} isClose={isClose} />

      <main className="m-6">
        <ProductHeader
          input={input}
          setInput={setInput}
          isClose={isClose}
          setIsClose={setIsClose}
          title={"TOPS"}
        />

        {/* Listings Section for Tops */}
        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading ? (
            <LoadingScreen />
          ) : tops?.length > 0 ? (
            tops.map((top) => <RegularCard key={top?.id} product={top} />)
          ) : (
            <div className="grid h-[60vh] w-[90vw] place-items-center">
              No data available
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Page;
