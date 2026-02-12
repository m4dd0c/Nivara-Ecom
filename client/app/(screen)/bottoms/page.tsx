"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "$/lib/utils/query-string";
import LoadingScreen from "$/components/shared/LoaderScreen";
import { useGetBottomsQuery } from "$/store/services/bottom";
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

  // Fetch data for bottoms
  const {
    data: bottomsData,
    refetch,
    isLoading,
  } = useGetBottomsQuery({ ...paramsObj });

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

  const bottoms = bottomsData?.bottoms || [];

  return (
    <div className="flex">
      <Sidebar type={"bottom"} setIsClose={setIsClose} isClose={isClose} />

      <main className="m-6">
        <ProductHeader
          input={input}
          setInput={setInput}
          isClose={isClose}
          setIsClose={setIsClose}
          title={"BOTTOMS"}
        />

        {/* Listings Section for Bottoms */}
        <section className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
          {isLoading ? (
            <LoadingScreen />
          ) : bottoms?.length > 0 ? (
            bottoms.map((bottom) => (
              <RegularCard key={bottom?.id as any} product={bottom} />
            ))
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
