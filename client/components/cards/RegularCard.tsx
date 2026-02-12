"use client";
import { IBottom, ITop, tColors } from "$/types/api";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import fallback from "$/public/images/fallback.png";
import Link from "next/link";
import Wishlist from "../shared/Wishlist";

const RegularCard = ({ product }: { product: ITop | IBottom }) => {
  // If no product is provided, return null or a default message
  if (!product) {
    return <div>No product available</div>;
  }
  return (
    <div className="bg-background max-w-[300px] overflow-hidden border h-fit">
      <Link href={`/product/${product?.id}`} className="block h-[400px] w-full">
        <Image
          priority
          width={500}
          height={500}
          className="size-full object-cover"
          src={product?.mainImage?.secureUrl || fallback}
          alt={product?.name}
        />
      </Link>
      {/* Card Content */}
      <div className="p-2">
        <div className="flex items-center justify-between uppercase">
          <Link
            href={`/product/${product?.id}`}
            className="line-clamp-2 text-sm hover:underline"
          >
            {product?.name}
          </Link>
          <Wishlist id={product?.id.toString()} />
        </div>
        <h1>₹{product?.price.toLocaleString()}</h1>
        <div className="text-foreground/70 mt-1 flex items-center justify-between uppercase">
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-4 border border-gray-500/50 px-1">
              <div className="flex items-center gap-[2px]">
                {product?.color.slice(0, 3).map((color: tColors, i: number) => (
                  <div
                    key={i}
                    className="inline-block size-3 border opacity-60"
                    style={{
                      backgroundColor: color,
                    }}
                  />
                ))}
              </div>
              <p className="whitespace-pre-wrap text-xs">
                {product?.size?.slice(0, 3)?.join("   ")}
              </p>
            </div>
            <PlusIcon size={13} />
          </div>
          <p className="text-xs">{product?.ratings?.stars.toFixed(1)} ★</p>
        </div>
      </div>
    </div>
  );
};

export default RegularCard;
