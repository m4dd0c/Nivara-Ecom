"use client";
import { Button } from "$/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "$/components/ui/card";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import Image from "next/image";
import fallback from "$/public/images/fallback.png";
import { useGetUserOrdersQuery } from "$/store/services/order";

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useGetUserOrdersQuery();
  const router = useRouter();

  if (isLoading) return <h1>Loading...</h1>; // Show a loading indicator
  if (isError || !orders) return <div>Failed to load orders.</div>; // Show error message if failed

  return (
    <div className="mx-auto my-10 px-4 max-lg:w-1/2 max-md:w-3/4 max-sm:w-full">
      <h1 className="my-8 text-center text-3xl uppercase">
        Your Orders ({orders.orders.length})
      </h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {orders.orders.length === 0 ? (
          <div className="col-span-4 text-center text-lg">
            You have no orders.
          </div>
        ) : (
          orders.orders.map((order) => (
            <Card
              key={order?.id as string}
              className="transition-shadow hover:shadow-lg"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold uppercase">
                  ORDER&nbsp;&nbsp;
                </CardTitle>
                <CardDescription>#{order.payment.orderId}</CardDescription>
                <p className="text-sm text-gray-500">
                  {dayjs(order.createdAt).format("MMM DD, YYYY")}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {/* Product Preview */}
                  <div className="flex space-x-4">
                    <Image
                      height={500}
                      width={500}
                      src={
                        order.product[0].productId.mainImage.secureUrl ||
                        fallback
                      }
                      alt={order.product[0].productId.name}
                      className="size-20 rounded-md object-cover"
                    />
                    <div>
                      <p className="font-medium">
                        {order.product[0].productId.name}
                      </p>
                      {order.product.length > 1 && (
                        <p className="text-gray-500">
                          & {order.product.length - 1} other item(s)
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Total */}
                  <p className="text-lg font-semibold">
                    Total: ₹{order.price.total}
                  </p>

                  {/* Shipping Address */}
                  <div className="space-y-2">
                    <p className="text-foreground/70 text-sm">
                      Shipping Address:
                    </p>
                    <p className="text-sm">
                      {order.address.flatNo}, {order.address.addressLine},{" "}
                      {order.address.landmark}
                      <br />
                      {order.address.city}, {order.address.district},{" "}
                      {order.address.state}, {order.address.country} -{" "}
                      {order.address.pinCode}
                    </p>
                  </div>

                  {/* Order Status */}
                  <p className="text-sm font-medium text-gray-500">
                    Status: {order.status}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/order/${order.id}`)}
                    className="flex-1"
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      alert(
                        "Tracking order functionality will be implemented soon!",
                      )
                    }
                    className="flex-1"
                  >
                    Track Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
