"use client";
import { IPopulateOrder } from "$/types/api";
import { Button } from "$/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "$/components/ui/card";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import fallback from "$/public/images/fallback.png";

const OrderCard = ({ order }: { order: IPopulateOrder }) => {
  const router = useRouter();
  return (
    <Card className="transition-shadow hover:shadow-lg">
      <CardHeader>
        <CardTitle className="font-semibold break-all">
          #{order?.payment?.paymentId || order?.id}
        </CardTitle>
        <p className="text-sm uppercase text-gray-500">
          {dayjs(order?.createdAt).format("MMM DD, YYYY")}
          {" • "}
          {order?.status}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {/* Product Preview */}
          <div className="flex items-center space-x-4">
            <Image
              height={500}
              width={500}
              src={
                (order?.product[0]?.productId as any)?.mainImage?.secureUrl ||
                fallback
              }
              alt={(order?.product[0]?.productId as any)?.name || "order-image"}
              className="size-20 rounded-md object-cover"
            />
            <div>
              <p className="font-medium uppercase">
                {(order?.product[0]?.productId as any)?.name}
              </p>
              <p className="text-xs font-medium uppercase text-gray-500">
                Quantity: {order?.product[0]?.quantity}
              </p>

              {/* Order Total */}
              <p className="text-lg font-semibold">
                ₹{(+order?.price?.total).toLocaleString()}
              </p>
            </div>
          </div>
          {/* Shipping Address */}
          <div className="space-y-2">
            <p className="text-foreground/70 text-sm">Shipping Address:</p>
            <p className="text-sm">
              {(order?.address as any)?.addressLine ||
                (order?.address as any)?.address}
              , {(order?.address as any)?.city}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => router.push(`/order/${order.id}`)}
          className="flex-1"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );
};

export default OrderCard;
