"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "$/components/ui/button";
import { X } from "lucide-react";
import { toast } from "$/hooks/use-toast";
import {
  useEditCartItemMutation,
  useGetCartQuery,
  useRemoveFromCartMutation,
} from "$/store/services/cart";
import fallback from "$/public/images/fallback.png";
import LoadingScreen from "$/components/shared/LoaderScreen";

const Page = () => {
  const router = useRouter();

  const { data: cartData, isLoading } = useGetCartQuery();
  const [handleRemove] = useRemoveFromCartMutation();
  const [editCartItem] = useEditCartItemMutation();

  const handleRemoveFromCart = async (cartId: string) => {
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

  const handleItemQuantity = async ({
    cartId,
    quantity,
  }: {
    cartId: string;
    quantity: number;
  }) => {
    if (quantity < 0) return;
    await editCartItem({ cartId, quantity }).unwrap();
  };
  const calcTotalPrice = (): number => {
    if (cartData)
      return cartData?.carts?.reduce(
        (acc: number, curr) => (acc += curr.quantity * curr.item.price),
        0,
      );
    return 999;
  };
  if (isLoading) return <LoadingScreen />;
  return (
    <div className="flex h-full flex-col text-sm" suppressHydrationWarning>
      <h1 className="my-8 text-center text-3xl uppercase">
        Shopping Bag ({cartData?.size})
      </h1>
      <div className="flex min-h-[75vh] flex-wrap gap-2 p-2 max-md:justify-center md:p-8">
        {cartData?.carts?.map((item: any) => (
          <div
            key={item?.item?.id}
            className="h-[355px] w-[200px] overflow-hidden border"
          >
            <Link
              href={`/product/${item?.item?.id}`}
              className="block size-fit"
            >
              <Image
                width={200}
                height={200}
                src={item?.item?.mainImage?.secureUrl || fallback}
                alt="cart-image"
                className="block h-[250px] w-[200px] object-cover"
              />
            </Link>

            <div className="p-2">
              <div className="flex items-center justify-between">
                <h1 className="line-clamp-1 flex-1 uppercase">
                  {item?.item?.name}
                </h1>
                <button
                  title="Remove from cart"
                  onClick={() => handleRemoveFromCart(item?.id)}
                >
                  <X size={20} className="text-foreground/70" />
                </button>
              </div>
              <div className="flex">
                <p>
                  <span className="">₹</span>
                  {(
                    Number(item?.item?.price) * Number(item?.quantity)
                  ).toLocaleString()}
                </p>
                <p className="text-foreground/70 pl-2 uppercase">
                  {item?.size} | {item?.color}
                </p>
              </div>
              <div className="mb-1 mt-2 flex w-fit items-center border">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleItemQuantity({
                      cartId: item?.id,
                      quantity: +item?.quantity - 1,
                    })
                  }
                >
                  -
                </Button>
                <span className="px-4 font-semibold">{item?.quantity}</span>
                <Button
                  variant="outline"
                  onClick={() =>
                    handleItemQuantity({
                      cartId: item?.id,
                      quantity: +item?.quantity + 1,
                    })
                  }
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-background sticky inset-x-0 bottom-0 flex flex-col items-center justify-between border max-md:py-4 md:flex-row">
        <p className="mx-4 flex-1 text-sm">
          * By continuing, I declare that I have read and accept the{" "}
          <Link href="/legal/terms-condition#purchase" className="underline">
            Purchase Conditions
          </Link>{" "}
          and understand SHIVAM GARMENTS's{" "}
          <Link href="/legal/cookie-policy" className="underline">
            Privacy and Cookie Policy.
          </Link>{" "}
        </p>
        <div>
          <p className="py-2 pr-4">
            <span>Total Price </span>
            <span className="text-foreground/70 text-sm">
              (inclusive all taxes)
            </span>
            <br />
            <span className="text-xl font-bold">₹&nbsp;</span>
            {calcTotalPrice().toLocaleString()}
          </p>
          <Button
            onClick={() => router.push("/cart/checkout")}
            className="w-full rounded-none"
          >
            Checkout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page;
