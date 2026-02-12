"use client";

import { useParams, useRouter } from "next/navigation";
import { useGetOrderByIdQuery } from "$/store/services/order";
import dayjs from "dayjs";
import Image from "next/image";
import { Button } from "$/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "$/components/ui/card";
import fallback from "$/public/images/fallback.png";

export default function OrderDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const { data, isLoading, isError } = useGetOrderByIdQuery(id);
  const order = data?.order;

  if (isLoading)
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  if (isError || !order)
    return (
      <div className="flex h-screen items-center justify-center">
        Failed to load order details.
      </div>
    );

  return (
    <div className="mx-auto my-10 max-w-3xl px-4">
      <h1 className="mb-8 text-center text-3xl font-bold uppercase">
        Order Details
      </h1>

      {/* Order Header */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold break-all">
            Order #{order.payment.paymentId || order.id}
          </CardTitle>
          <p className="text-sm text-gray-500">
            Placed on {dayjs(order.createdAt).format("MMM DD, YYYY")}
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Status</p>
              <p className="font-semibold uppercase">{order.status}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total</p>
              <p className="font-semibold">
                ₹{(+order.price.total).toLocaleString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Order Items */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {order.product.map((item, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 border-b pb-4 last:border-0 last:pb-0"
            >
              <Image
                height={500}
                width={500}
                src={item.productId.mainImage.secureUrl || fallback}
                alt={item.productId.name}
                className="h-20 w-20 rounded-md object-cover"
              />
              <div className="flex-1">
                <p className="font-medium">{item.productId.name}</p>
                <div className="mt-1 text-sm text-gray-500">
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                  <p>Color: {item.color}</p>
                  {item?.productType && <p>Type: {item.productType}</p>}
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  ₹{(+item.productId.price * item.quantity).toLocaleString()}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shipping & Payment Info */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Shipping Address */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Shipping Address
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-medium">{order.receiverName}</p>
            <p className="text-sm text-gray-600">
              {order.address.flatNo}, {order.address.addressLine},{" "}
              {order.address.landmark}
            </p>
            <p className="text-sm text-gray-600">
              {order.address.city}, {order.address.district}
            </p>
            <p className="text-sm text-gray-600">
              {order.address.state}, {order.address.country} -{" "}
              {order.address.pinCode}
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                Phone: {order.mobileNumber}
              </p>
              <p className="text-sm text-gray-600">Email: {order.email}</p>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{(+order.price.subTotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax</span>
              <span>₹{(+order.price.tax).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span>-₹{(+order.price.discount).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t pts-2 font-semibold">
              <span>Total</span>
              <span>₹{(+order.price.total).toLocaleString()}</span>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm text-gray-600 break-all">
                Payment ID: {order.payment.paymentId}
              </p>
              <p className="text-sm text-gray-600 uppercase">
                Status: {order.payment.status}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center space-x-4">
        <Button variant="outline" onClick={() => router.back()}>
          Back to Orders
        </Button>
        <Button onClick={() => alert("Tracking feature coming soon!")}>
          Track Order
        </Button>
      </div>
    </div>
  );
}
