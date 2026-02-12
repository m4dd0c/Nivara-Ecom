"use client";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "$/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "$/components/ui/form";
import { Input } from "$/components/ui/input";
import { checkoutSchema } from "$/lib/schema/checkoutSchema";
import { Label } from "$/components/ui/label";
import { RadioGroup, RadioGroupItem } from "$/components/ui/radio-group";
import { tAddress } from "$/types/types";
import { Loader2 } from "lucide-react";
import { AddAddress } from "$/components/dialog/ShippingAddressDialog";
import { useGetCartQuery } from "$/store/services/cart";
import { useGetLoggedInUserQuery } from "$/store/services/user";
import { useCreateOrderMutation } from "$/store/services/order";
import { useToast } from "$/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedAddress, setSelectedAddress] = useState("");
  const { toast } = useToast();
  const router = useRouter();

  const { data: cartData, isLoading: isCartLoading } = useGetCartQuery();
  const {
    isLoading: isUserLoading,
    isError: isUserError,
    data: userData,
  } = useGetLoggedInUserQuery();

  const [createOrder] = useCreateOrderMutation();
  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      mobileNumber: userData?.phone || (userData as any)?.mobileNumber || "",
      altMobileNumber: userData?.phone || (userData as any)?.mobileNumber || "",
      email: userData?.email || "",
      name: userData?.name || "",
    },
  });

  // Update form values when user data is loaded
  useEffect(() => {
    if (userData) {
      form.reset({
        mobileNumber: userData.phone || (userData as any).mobileNumber || "",
        altMobileNumber: userData.phone || (userData as any).mobileNumber || "",
        email: userData.email || "",
        name: userData.name || "",
      });

      const addresses = (userData as any).address || [];
      if (addresses.length > 0)
        setSelectedAddress((addresses[0] as tAddress).id.toString());
    }
  }, [userData, form]);

  const onSubmit = async (values: z.infer<typeof checkoutSchema>) => {
    try {
      if (!selectedAddress) return alert("Please select an address.");

      if (!userData) return alert("You're not loggedin, Please login first.");

      // creating products array to send to backend
      const products = cartData?.carts
        ?.map((item: any) => {
          return {
            cartId: item?.id,
            id: item.item?.id,
            quantity: item.quantity || 1,
            size: item.size,
            color: item.color,
          };
        })
        .filter(Boolean);

      // no product found in cart
      if (!products || products.length === 0) {
        alert("No products in the cart.");
        return;
      }

      // creating order
      const orderResponse = await createOrder({
        products,
        receiverName: values.name || undefined,
        mobileNumber: values.mobileNumber || undefined,
        email: values.email || undefined,
        address: selectedAddress,
      }).unwrap();

      if (orderResponse) {
        toast({
          title: "Order placed successfully!",
          description: "Your order has been placed successfully.",
        });
        router.push("/order");
      }
    } catch (error) {
      console.error("Order creation failed:", error);
      toast({
        variant: "destructive",
        title: "Order failed",
        description: "Something went wrong while placing your order.",
      });
    }
  };

  useEffect(() => {
    if (!isUserLoading)
      if (isUserError || !userData)
        console.error("You're not logged in, Please login first.");
      else {
        const addresses = (userData as any).address || [];
        if (addresses.length > 0)
          setSelectedAddress((addresses[0] as tAddress).id.toString());
      }
  }, [isUserError, userData, isUserLoading]);

  if (isUserLoading || isCartLoading)
    return (
      <div className="grid h-screen w-full place-items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  return (
    <div className="mx-auto my-10 w-5/6">
      <div className="my-8">
        <h1 className="text-center text-3xl">Shipping Summery</h1>
      </div>
      <div className="mt-8 rounded-lg border border-zinc-800 p-4">
        <div>
          <h1 className="my-2 text-zinc-400">Personal Info</h1>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <FormField
                    control={form.control}
                    name="mobileNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg:+91 9876543210"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="altMobileNumber"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Alternative Mobile Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="eg: 0987654321"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Receiver Name, eg: John Doe"
                            type="text"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="email address, eg: address@service.tld"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <h1 className="my-2 text-zinc-400">Shipping address</h1>
                  <div>
                    <RadioGroup
                      defaultValue={selectedAddress}
                      onValueChange={(ev) => setSelectedAddress(ev)}
                    >
                      {(userData as any)?.address?.map((address: any) => (
                        <div
                          className="flex items-center justify-start rounded-lg border border-zinc-800 px-4"
                          key={(address as tAddress).id.toString()}
                        >
                          {/* <FormControl> */}

                          <RadioGroupItem
                            value={(address as tAddress).id.toString()}
                            id={(address as tAddress).id.toString()}
                          />
                          {/* </FormControl> */}
                          <Label htmlFor={(address as tAddress).id.toString()}>
                            <div className="">
                              <div className="p-6">
                                <div className="space-y-2">
                                  <p className="text-sm">
                                    {address.flatNo}, {address.address} (
                                    {address.landmark})
                                  </p>
                                  <p className="text-sm">
                                    {address.city}, {address.district} (
                                    {address.pinCode}), {address.state}{" "}
                                    {address.country}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                </div>
                <Button type="submit">Pay Now</Button>
              </form>
            </Form>
            <div className="mt-4">
              <AddAddress />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
