"use client";
import React from "react";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import "react-responsive-carousel/lib/styles/carousel.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { carouselData, carouselDataMobile } from "./constant/carouselData";
import useMediaQuery from "$/hooks/useMediaQuery";
import fallback from "$/public/images/fallback.png";

const Hero = () => {
  const isMobile = useMediaQuery("(max-width: 640px)"); // Check if the screen width is <= 640px
  const dataToRender = isMobile ? carouselDataMobile : carouselData;

  return (
    <div className="mb-10">
      <Carousel autoPlay={true} infiniteLoop={true} showThumbs={false}>
        {dataToRender?.map((item: any, index: number) => {
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
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Hero;
