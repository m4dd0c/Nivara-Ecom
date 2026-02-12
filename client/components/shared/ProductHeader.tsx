import React, { Dispatch, SetStateAction } from "react";
import { Button } from "$/components/ui/button";
import SearchIcon from "@mui/icons-material/Search";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";

export const ProductHeader = ({
  input,
  setInput,
  isClose,
  setIsClose,
  title,
}: {
  input: string;
  setInput: Dispatch<SetStateAction<string>>;
  isClose: boolean;
  setIsClose: Dispatch<SetStateAction<boolean>>;
  title: string;
}) => {
  return (
    <div className="mx-auto mb-4 flex w-[95vw] items-end justify-center gap-2 max-md:flex-col max-md:items-start max-md:justify-end">
      <h1 className="mt-2 text-8xl uppercase max-md:text-6xl">{title}</h1>
      <div className="w-full">
        <h1 className="px-2 py-1 text-foreground/70">
          Flex the world, Get Everything in your Bag.
        </h1>
        <div className="flex w-full gap-2">
          <div className="flex h-9 w-full items-center gap-2 rounded-md border p-2">
            <SearchIcon fontSize="small" />
            <input
              type="search"
              placeholder="Search"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full border-transparent bg-background text-sm shadow-none outline-none"
            />
          </div>
          <Button
            variant={"outline"}
            onClick={() => setIsClose(false)}
            disabled={!isClose}
          >
            <TuneRoundedIcon fontSize="small" />
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};
