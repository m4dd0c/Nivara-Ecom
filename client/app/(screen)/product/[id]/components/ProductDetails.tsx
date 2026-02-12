"use client";
import { Bell, BellRing } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Separator } from "$/components/ui/separator";
import { Button } from "$/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "$/hooks/use-toast";
import { IBottom, ITop, tColors, tSizes } from "$/types/api";
import { useGetTopByIdQuery } from "$/store/services/top";
import { useGetBottomByIdQuery } from "$/store/services/bottom";
import { useAddToCartMutation } from "$/store/services/cart";
import fallback from "$/public/images/fallback.png";
import LoadingScreen from "$/components/shared/LoaderScreen";
import Wishlist from "$/components/shared/Wishlist";

const ProductDetails = ({ id }: any) => {
  const { data: topData, isFetching: isFetchingTop } = useGetTopByIdQuery(id);
  const { data: bottomData, isFetching: isFetchingBottom } =
    useGetBottomByIdQuery(id);
  const [itemData, setItemData] = useState<ITop | IBottom | null>(null);
  const [remindMe, setRemindMe] = useState<boolean>(false);

  const handleRemindMe = () => {
    // TODO:
    setRemindMe(!remindMe);
    console.log("please implement me, remind me");
  };

  const [size, setSize] = useState<tSizes | null>(itemData && itemData.size[0]);
  const [color, setColor] = useState<tColors | null>(
    itemData && itemData.color[0],
  );

  const initialMainImage = itemData?.mainImage?.secureUrl;
  const [selectedImage, setSelectedImage] = useState(initialMainImage);
  const [noOfItems, setNoOfItems] = useState(1);
  const [addtocart, { isLoading }] = useAddToCartMutation();
  const handleImageClick = (url: string) => {
    setSelectedImage(url);
    // TODO: show big image
    console.log(!!selectedImage, "please implement me");
  };

  useEffect(() => {
    if (topData) setItemData(topData?.top);
    if (bottomData) setItemData(bottomData?.bottom);
    if (itemData) {
      setSize(itemData.size[0]);
      setColor(itemData.color[0]);
    }
  }, [topData, bottomData, itemData]);

  const addingInTheCart = () => {
    if (itemData?.quantity && itemData?.quantity <= 0) {
      return toast({
        variant: "destructive",
        title: "Item is out of Stock!",
      });
    }
    const quantity = String(noOfItems);
    const itemId = String(id);
    addtocart({ itemId, quantity, size, color })
      .unwrap()
      .then(() => {
        toast({
          variant: "default",
          title: "Add to cart successfully",
          description: "Go to cart section to buy the product.",
        });
      })
      .catch((e) => {
        toast({
          variant: "destructive",
          title: e?.data?.message || "Uh oh! Add to cart failed",
          description: "Something went wrong to proceed further.",
        });
      });
  };

  const loading = isFetchingTop || isFetchingBottom;
  return loading ? (
    <LoadingScreen />
  ) : (
    <div className="p-7">
      <div className="flex flex-col gap-2 sm:flex-row sm:gap-8">
        {/* Left Section: Images */}
        <div className="flex flex-1 flex-col">
          {[initialMainImage, ...(itemData?.additionalImage || [])]?.map(
            (item: any, i: number) => {
              if (item?.secureUrl || initialMainImage)
                return (
                  <div
                    key={i}
                    className="size-full"
                    onClick={() =>
                      handleImageClick(item?.secureUrl || initialMainImage)
                    }
                  >
                    <Image
                      src={item?.secureUrl || initialMainImage || fallback}
                      alt={`item-preview-sub-image-${i}`}
                      width={1000}
                      height={1000}
                      className="block size-full object-contain"
                    />
                  </div>
                );
            },
          )}
        </div>

        {/* Right Section: Details */}
        <div className="sticky top-36 h-[90vh] flex-1">
          <div className="flex justify-between">
            <h1 className="pb-1 text-4xl uppercase">{itemData?.name}</h1>
            <Wishlist id={itemData?.id.toString()} />
          </div>
          <p className="pb-5 text-sm text-gray-500">{itemData?.description}</p>
          <h1 className="text-4xl">₹{itemData?.price}</h1>
          <small className="text-xs uppercase text-gray-500">
            MRP excl. of all taxes
          </small>

          <Separator className="my-6" />

          {/* Add to Cart Section */}
          {itemData && itemData?.quantity <= 0 ? (
            <div>
              <div className="mt-10 flex items-center gap-2 text-center">
                <h1 className="text-3xl font-semibold uppercase text-red-500">
                  Out of Stock!
                </h1>
                <div>
                  <Button
                    variant={"outline"}
                    onClick={handleRemindMe}
                    title="Remind me"
                  >
                    {remindMe ? (
                      <BellRing className="text-sky-500" />
                    ) : (
                      <Bell color="white" />
                    )}
                  </Button>
                </div>
              </div>
              <small className="text-xs uppercase text-gray-500">
                We'll inform you as the Product come back in the stocks!
              </small>
              <Separator className="my-6" />
            </div>
          ) : (
            <div className="mb-6">
              <p className="mb-2 text-lg">Add to cart</p>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    onClick={() => {
                      if (noOfItems >= 2) setNoOfItems(noOfItems - 1);
                    }}
                  >
                    -
                  </Button>
                  <span className="px-4 font-semibold">{noOfItems}</span>
                  <Button
                    variant="outline"
                    onClick={() => setNoOfItems(noOfItems + 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="default"
                  onClick={addingInTheCart}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2
                        className="animate-spin"
                        style={{ width: "17px" }}
                      />
                      <p>Add to cart</p>
                    </div>
                  ) : (
                    "Add to cart"
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="mb-6">
            <p className="p-1 text-sm uppercase">Sizes</p>
            <div className="flex gap-2">
              {itemData?.size?.map((sz: tSizes, i: number) => (
                <Button
                  key={i}
                  variant="outline"
                  className={`${sz === size && "bg-foreground text-background hover:bg-foreground/90 hover:text-background/90 border-2"} font-semibold uppercase`}
                  onClick={() => setSize(sz)}
                >
                  {sz}
                </Button>
              ))}
              <Button variant="outline">Size Chart</Button>
            </div>
            <div className="my-3">
              <p className="p-1 text-sm uppercase">Colors</p>
              <div className="flex gap-2">
                {itemData?.color?.map((clr: tColors, i: number) => (
                  <div
                    key={i}
                    className={`flex items-center border ${color === clr && "text-background bg-foreground"} rounded-md p-1 hover:border hover:border-zinc-700`}
                  >
                    <label
                      className={`${clr === "multicolor" ? "bg-multicolor" : `bg-[${color}]`} mx-1 block size-4 cursor-pointer border`}
                      style={{ backgroundColor: clr }}
                      htmlFor={clr}
                    ></label>
                    <input
                      type="checkbox"
                      name="color"
                      id={clr}
                      className="hidden"
                      onClick={() => setColor(clr)}
                    />
                    <label
                      className="cursor-pointer px-1 text-sm capitalize"
                      htmlFor={clr}
                    >
                      {clr}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Separator className="my-6" />
          <div className="flex items-start justify-between">
            {/* Payment Policy */}
            <div className="mb-4">
              <h1 className="mb-2 text-lg font-semibold uppercase">
                Payment Policy
              </h1>
              <p className="text-sm">We accept COD and UPI payments.</p>
            </div>

            {/* Return Policy */}
            <div className="mb-4">
              <h1 className="mb-2 text-lg font-semibold uppercase">
                Return Policy
              </h1>
              <p>No returns allowed.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
