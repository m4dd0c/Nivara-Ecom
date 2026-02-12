"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "$/components/ui/button";
import { useGetTopsQuery } from "$/store/services/top";
import { useGetBottomsQuery } from "$/store/services/bottom";
import { useRouter } from "next/navigation";
import fallback from "$/public/images/fallback.png";

const staticPageInfo = {
  popular: {
    id: "1",
    title: "Explore Popular Now",
    desc: "Embrace the spirit of the season with our carefully curated collection. Celebrate style and comfort with the perfect seasonal picks!",
    leftImage: "/images/popularNow/left.png",
  },
  trending: {
    id: "2",
    title: "Explore Trending Now",
    desc: "Embrace the spirit of the season with our carefully curated collection. Celebrate style and comfort with the perfect seasonal picks!",
    leftImage: "/images/todayHot/banner.png",
  },
};

const HomeBanner = ({ type }: { type: "most-sold" | "popular" }) => {
  const data =
    type === "popular" ? staticPageInfo.popular : staticPageInfo.trending;

  const [product, setProduct] = useState<any>({
    images: [],
    name: "",
    desc: "",
    _id: "",
  });

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const router = useRouter();

  const { data: tops, isFetching: isFetchingTops } = useGetTopsQuery({
    sort: type,
    limit: 1,
  });
  const { data: bottoms, isFetching: isFetchingBottoms } = useGetBottomsQuery({
    sort: type,
    limit: 1,
  });

  useEffect(() => {
    if (bottoms?.bottoms && tops?.tops) {
      if (type === "popular") {
        const data = [
          ...(bottoms?.bottoms ?? []),
          ...(tops?.tops ?? []),
        ].reduce((prev, curr) => {
          return prev.views < curr.views ? curr : prev;
        }, tops?.tops[0]);
        let arr = [data?.mainImage];
        if (data?.additionalImage)
          arr = [...arr, ...(data?.additionalImage ?? [])];
        setProduct({
          images: arr,
          name: data?.name,
          desc: data?.description,
          _id: data?.id,
        });
      } else {
        const data = [
          ...(bottoms?.bottoms ?? []),
          ...(tops?.tops ?? []),
        ].reduce((prev, curr) => {
          return prev.sold < curr.sold ? curr : prev;
        }, tops?.tops[0]);
        let arr = [data?.mainImage];
        if (data?.additionalImage) arr = [...arr, ...data.additionalImage];
        setProduct({
          images: arr,
          name: data?.name,
          desc: data?.description,
          _id: data?.id,
        });
      }
    }
  }, [tops?.tops, bottoms?.bottoms, type]);

  useEffect(() => {
    if (product.images.length > 0) {
      // Add this check to ensure images are available
      const interval = setInterval(() => {
        setCurrentImageIndex(
          (prevIndex) => (prevIndex + 1) % product.images.length,
        );
      }, 2000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [product.images]);

  const handleImageClick = () => {
    if (product) {
      router.push(`/product/${product?._id}`);
    }
  };

  const isLoading = isFetchingBottoms || isFetchingTops;
  return (
    !isLoading && (
      <div className="flex h-[80vh] place-content-center overflow-hidden max-md:h-full max-md:flex-col">
        {/* Left Section */}
        <div className="relative h-full w-1/2 max-md:w-full">
          <Image
            src={data?.leftImage || fallback}
            width={1000}
            height={1000}
            alt="abstract-bg"
          />
          <div className="text-background absolute top-0 z-10 flex h-full flex-1 flex-col items-center justify-center overflow-hidden p-8 text-center">
            <h1 className=" mb-4 text-xl font-bold text-white sm:text-3xl">
              WE MADE YOUR EVERYDAY FASHION BETTER!
            </h1>
            <p className="mb-6 text-sm text-gray-300 lg:text-base">
              {data?.desc}
            </p>
            <Button
              onClick={handleImageClick}
              className="bg-white text-black hover:bg-white/90"
            >
              Shop Now
            </Button>
          </div>
        </div>

        {/* Right Section */}
        {product?.images[currentImageIndex]?.secureUrl && (
          <div className="w-1/2 max-md:w-full" onClick={handleImageClick}>
            <Image
              src={product?.images[currentImageIndex]?.secureUrl || fallback}
              width={1000}
              height={1000}
              alt={`Popular Now - ${currentImageIndex + 1}`}
              className="block size-full cursor-pointer object-cover"
            />
          </div>
        )}
      </div>
    )
  );
};

export default HomeBanner;
