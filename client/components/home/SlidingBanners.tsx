"use client";
import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { slidingBanners } from "./constant/slidingBanners";
import fallback from "$/public/images/fallback.png";

const SlidingBanners = () => {
  return (
    <>
      <div className="mt-8 px-4 text-center">
        <h1 className="text-foreground mb-4 text-3xl font-bold sm:text-4xl">
          Match your outfit accoding occasions
        </h1>
        <p className="text-foreground/70 mb-6 text-sm">
          Embrace the spirit of the season with our carefully curated
          collection.
          <br />
          Celebrate style and comfort with the perfect seasonal picks!
        </p>
      </div>
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        {slidingBanners?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <Image
                width={1000}
                height={1000}
                src={item?.image || fallback}
                alt="main-image"
                className="size-full"
                priority
              />
              {/* <p className="legend">Legend 1</p> */}
            </div>
          );
        })}
      </Carousel>
    </>
  );
};

export default SlidingBanners;
