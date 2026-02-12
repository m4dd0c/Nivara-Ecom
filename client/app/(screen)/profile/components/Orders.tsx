"use client";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "$/components/ui/tabs";
import OrderCard from "$/components/cards/OrderCard";
import { useGetUserOrdersQuery } from "$/store/services/order";
import LoadingScreen from "$/components/shared/LoaderScreen";

const Orders = () => {
  const { data: orders, isLoading: isOrderLoading } = useGetUserOrdersQuery();
  const [isLoading, setIsLoading] = useState(isOrderLoading);
  const [shippedOrders, setShippedOrders] = useState(orders?.orders);
  const [orderHistory, setOrderHistory] = useState(orders?.orders);

  useEffect(() => {
    // filter only showing shipped products
    const filterOrders = () => {
      setIsLoading(true);
      if (!orders?.orders) return;
      const shippedOrdersArr = orders.orders.filter(
        (order) =>
          order.status.toLowerCase() === "shipped" ||
          order.status.toLowerCase() === "processing",
      );
      const orderHistoryArr = orders.orders.filter(
        (order) =>
          order.status.toLowerCase() !== "processing" &&
          order.status.toLowerCase() !== "shipped",
      );
      setShippedOrders(shippedOrdersArr);
      setOrderHistory(orderHistoryArr);
      setIsLoading(false);
    };
    if (orders?.orders) filterOrders();
  }, [orders]);

  return (
    <>
      <Tabs defaultValue="current-orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current-orders">
            Current Orders ({shippedOrders?.length})
          </TabsTrigger>
          <TabsTrigger value="order-history">
            Order History ({orderHistory?.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="current-orders">
          <div className="mx-auto my-10 px-4 max-lg:w-1/2 max-md:w-3/4 max-sm:w-full">
            {/* Orders Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {isLoading ? (
                <LoadingScreen />
              ) : (
                shippedOrders &&
                shippedOrders?.length > 0 &&
                shippedOrders.map((order) => (
                  <OrderCard key={order?.id as string} order={order} />
                ))
              )}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="order-history">
          <div className="mx-auto my-10 px-4 max-lg:w-1/2 max-md:w-3/4 max-sm:w-full">
            {/* Orders Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {orderHistory?.length === 0 ? (
                <div className="col-span-4 text-center text-lg">
                  You have no orders.
                </div>
              ) : (
                orderHistory &&
                orderHistory.map((order) => (
                  <OrderCard key={order?.id as string} order={order} />
                ))
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Orders;
