import { IBottom, ITop } from "$/types/api";
import Image from "next/image";
import Link from "next/link";
import fallback from "$/public/images/trending/cargo.jpg";
import React from "react";

const LargeCard = ({
  product,
  type,
}: {
  product: ITop | IBottom;
  type: string;
}) => {
  const href = product ? `/product/${product?.id}` : "/new-arrivals";
  return (
    <Link href={href} className="mx-1 block cursor-pointer">
      <div className="group h-[450px] w-[280px] overflow-hidden">
        <Image
          src={product?.mainImage?.secureUrl || fallback}
          alt={`large-image-${product?.name ?? type}`}
          height={550}
          width={320}
          className="size-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>
      <div className="py-2 text-sm uppercase">{type ?? "Trendy"}</div>
    </Link>
  );
};

export default LargeCard;
