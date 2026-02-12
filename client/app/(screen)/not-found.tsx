import React from "react";

import { Separator } from "$/components/ui/separator";
import Link from "next/link";

const page = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("/images/not-found.jpg")',
        backgroundPosition: "center 100%",
      }}
      className="grid h-screen place-content-center gap-2 bg-cover bg-no-repeat"
    >
      <div className="w-[95vw] border bg-background/70 p-5 md:w-[70vw]">
        <div className="flex items-center gap-2">
          <h1>404</h1>
          <Separator orientation="vertical" className="h-8 text-white" />
          <h1 className="text-xl uppercase">Page not found</h1>
        </div>
        <p>
          We are sorry but this page is no longer available on our web site.
        </p>
        <br />
        <br />
        <Link
          className="w-fit border border-gray-500 px-4 py-2 uppercase"
          href={"/"}
        >
          go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default page;
