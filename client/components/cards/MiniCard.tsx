import { IBottom, ITop } from "$/types/api";
import Image from "next/image";
import Link from "next/link";
import fallback from "$/public/images/fallback.png";

const MiniCard = ({ product }: { product: ITop | IBottom }) => {
  return (
    <div className="border transition-transform duration-300 hover:scale-95">
      <Link
        href={`/product/${product?.id}`}
        className="block w-[200px] cursor-pointer overflow-hidden shadow-lg"
      >
        <Image
          src={product?.mainImage?.secureUrl || fallback}
          height={300}
          width={300}
          alt={product?.name || "new-arrivals"}
          className="h-72 w-[200px] object-cover"
        />
      </Link>
      <div className="m-2">
        <div className="text-foreground/50 line-clamp-1 flex w-full items-center justify-evenly text-xs uppercase">
          <p>{product?.size.length}+ sizes</p>
          <p>{" | "}</p>
          <p>{product?.color.length}+ colors</p>
          <p>{" | "}</p>
          <p>{product?.ratings?.stars.toFixed(1)} ★</p>
        </div>
        <Link
          href={`/product/${product?.id}`}
          className="line-clamp-1 uppercase hover:underline"
        >
          {product?.name}
        </Link>
        <h1>₹{product?.price.toLocaleString()}</h1>
      </div>
    </div>
  );
};

export default MiniCard;
