// info:  Filter selection for Bottoms and Tops pages.
"use client";

import CloseIcon from "@mui/icons-material/Close";
import { bottomEnums, sortBy, topEnums } from "$/lib/constants";
import { useEffect, useState } from "react";
import { SortBy } from "$/components/filters/SortBy";
import { ColorsCard } from "$/components/filters/ColorsCard";
import { Filters } from "$/components/filters/Filters";
import { ITopEnums } from "$/types/api";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export const Sidebar = ({
  type,
  setIsClose,
  isClose,
}: {
  type: "top" | "bottom";
  setIsClose: any;
  isClose: boolean | undefined;
}) => {
  const [filters, setFilters] = useState(
    type === "top" ? topEnums : bottomEnums,
  );
  useEffect(() => {
    if (!isClose) {
      document.body.style.overflow = "hidden"; // Disable scroll
    } else {
      document.body.style.overflow = "auto"; // Enable scroll
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isClose]);

  const route = useRouter();
  const clearAllFilters = () => {
    route.replace(window.location.href.split("?")[0]);
  };

  return (
    <div
      className={`bg-background/80 fixed inset-0 z-50 ${
        isClose ? "hidden" : "block"
      }`}
    >
      <div className="bg-background h-screen w-[calc(100%-10vw)] overflow-y-scroll border-r p-4 shadow-2xl">
        {/* header */}
        <section>
          <div className="flex items-center justify-end gap-3">
            <Button
              variant="destructive"
              className="rounded-full"
              onClick={clearAllFilters}
            >
              Clear Filters
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => setIsClose(true)}
            >
              <CloseIcon
                className="text-foreground"
                color="inherit"
                fontSize="medium"
              />
            </Button>
          </div>
        </section>

        {/* main content */}
        <section>
          {/* filters */}
          <h1 className="mb-2 text-xl font-bold">Sort By</h1>
          <div id="sizes" className="mb-3 flex flex-wrap gap-2">
            {sortBy.map((el) => (
              <SortBy data={el} key={el} />
            ))}
          </div>

          <h1 className="mb-2 text-xl font-bold">Colors</h1>
          <div id="color" className="mb-3 flex flex-wrap gap-2">
            {filters.color.map((color) => (
              <ColorsCard color={color} key={color} />
            ))}
          </div>

          <h1 className="mb-2 text-xl font-bold">Fits</h1>
          <div id="fits" className="mb-3 flex flex-wrap gap-2">
            {filters.fit.map((fit) => (
              <Filters filterName="fit" data={fit} key={fit} />
            ))}
          </div>

          <h1 className="mb-2 text-xl font-bold">Sizes</h1>
          <div id="sizes" className="mb-3 flex flex-wrap gap-2">
            {filters.size.map((size) => (
              <Filters filterName="size" data={size} key={size} />
            ))}
          </div>

          <h1 className="mb-2 text-xl font-bold">Fabrics</h1>
          <div id="fabrics" className="mb-3 flex flex-wrap gap-2">
            {filters.fabric.map((fabric) => (
              <Filters filterName="fabric" data={fabric} key={fabric} />
            ))}
          </div>

          <h1 className="mb-2 text-xl font-bold">Styles</h1>
          <div id="styles" className="mb-3 flex flex-wrap gap-2">
            {filters.style.map((style) => (
              <Filters filterName="style" data={style} key={style} />
            ))}
          </div>

          {type === "top" && (
            <>
              <h1 className="mb-2 text-xl font-bold">Designs</h1>
              <div id="designs" className="mb-3 flex flex-wrap gap-2">
                {(filters as ITopEnums).design.map((design) => (
                  <Filters filterName="design" data={design} key={design} />
                ))}
              </div>
            </>
          )}
          {type === "top" && (
            <>
              <h1 className="mb-2 text-xl font-bold">Occasions</h1>
              <div id="occasions" className="mb-3 flex flex-wrap gap-2">
                {(filters as ITopEnums).occasion.map((occasion) => (
                  <Filters
                    filterName="occasion"
                    data={occasion}
                    key={occasion}
                  />
                ))}
              </div>
            </>
          )}

          {type === "top" && (
            <>
              <h1 className="mb-2 text-xl font-bold">Seasons</h1>
              <div id="seasons" className="mb-3 flex flex-wrap gap-2">
                {(filters as ITopEnums).season.map((season) => (
                  <Filters filterName="season" data={season} key={season} />
                ))}
              </div>
            </>
          )}

          {type === "top" && (
            <>
              <h1 className="mb-2 text-xl font-bold">SleeveTypes</h1>
              <div id="sleeveTypes" className="mb-3 flex flex-wrap gap-2">
                {(filters as ITopEnums).sleeveType.map((sleeveType) => (
                  <Filters
                    filterName="sleeveType"
                    data={sleeveType}
                    key={sleeveType}
                  />
                ))}
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
};
