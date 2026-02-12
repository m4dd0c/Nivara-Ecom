import Link from "next/link";
import Image from "next/image";
import { Bookmark, X } from "lucide-react";
import { tColors, tSizes } from "$/types/api";
import { Button } from "../ui/button";
import { toast } from "$/hooks/use-toast";
import fallback from "$/public/images/fallback.png";
import {
  useEditCartItemMutation,
  useRemoveFromCartMutation,
} from "$/store/services/cart";
import Wishlist from "../shared/Wishlist";

const SmallCard = ({
  product,
  quantity = 1,
  cartId,
  size,
  color,
}: {
  product: any;
  quantity?: number;
  cartId?: string;
  size?: tSizes;
  color?: tColors;
}) => {
  const [handleRemove] = useRemoveFromCartMutation();
  const handleRemoveFromCart = async () => {
    if (!cartId) return;
    try {
      const { data } = await handleRemove(cartId);
      if (data) {
        toast({
          variant: "default",
          title: "Remove from cart successfully",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message || "Uh oh! Remove from cart failed",
        description: "Something went wrong.",
      });
    }
  };
  const [editCartItem] = useEditCartItemMutation();
  const handleItemQuantity = async ({ quantity }: { quantity?: number }) => {
    if (!quantity || quantity < 0 || !cartId) return;
    await editCartItem({ cartId, quantity }).unwrap();
  };

  return (
    <div className="h-[355px] w-[200px] overflow-hidden border">
      <Link href={`/product/${product?.id}`} className="block size-fit">
        <Image
          width={200}
          height={200}
          src={product?.mainImage?.secureUrl || fallback}
          alt="cart-image"
          className="block h-[250px] w-[200px] object-cover"
        />
      </Link>

      <div className="p-2">
        <div className="flex items-center justify-between">
          <h1 className="line-clamp-1 flex-1 uppercase">{product?.name}</h1>
          {cartId ? (
            <button
              title="Remove from cart"
              onClick={() => handleRemoveFromCart()}
            >
              <X size={20} className="text-foreground/70" />
            </button>
          ) : (
            <div title="Add to wishlist">
              <Wishlist id={product?.id.toString()} />
            </div>
          )}
        </div>
        <div className="flex">
          <p>
            <span className="">₹</span>
            {(Number(product?.price) * quantity).toLocaleString()}
          </p>
          {cartId && (
            <p className="text-foreground/70 pl-2 uppercase">
              {size} | {color}
            </p>
          )}
        </div>
        {cartId && (
          <div className="mb-1 mt-2 flex w-fit items-center border">
            <Button
              variant="outline"
              onClick={() =>
                handleItemQuantity({
                  quantity: quantity - 1,
                })
              }
            >
              -
            </Button>
            <span className="px-4 font-semibold">{quantity}</span>
            <Button
              variant="outline"
              onClick={() =>
                handleItemQuantity({
                  quantity: quantity + 1,
                })
              }
            >
              +
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmallCard;
