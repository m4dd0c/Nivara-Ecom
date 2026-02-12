"use client";
import { Button } from "$/components/ui/button";
import React, { useState } from "react";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "$/components/ui/dialog";
import { Input } from "$/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "$/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addressSchema } from "$/lib/schema/checkoutSchema";
import { Loader } from "lucide-react";
import { useUpdateUserMutation } from "$/store/services/user";
import { useToast } from "$/hooks/use-toast";

export function AddAddress() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const form = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      country: "",
      state: "",
      district: "",
      city: "",
      address: "",
      pinCode: "",
      flatNo: "",
      landmark: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof addressSchema>) => {
    try {
      const editedUser = await updateUser({
        address: {
          country: values.country || undefined,
          state: values.state || undefined,
          district: values.district || undefined,
          city: values.city || undefined,
          address: values.address || undefined,
          pinCode: values.pinCode || undefined,
          flatNo: values.flatNo || undefined,
          landmark: values.landmark || undefined,
        },
      }).unwrap();
      if (!editedUser) throw new Error("Failed to update user data.");
      toast({
        title: "Address added",
        description: "Your shipping address has been updated successfully.",
      });
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Error updating user", JSON.stringify(error, null, 2));
      if (error && typeof error === "object" && "data" in error) {
        console.error("Server error data:", (error as any).data);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"link"}
          type="button"
          className="mt-2 text-sm text-blue-500 hover:text-blue-900 px-0 h-auto"
        >
          Add a new Address...
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-1">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <FormField
                control={form.control}
                name="flatNo"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>Flat No.</FormLabel>
                    <FormControl>
                      <Input placeholder="Flat No." type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pinCode"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>Pin Code</FormLabel>
                    <FormControl>
                      <Input placeholder="Pin Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: Jaipur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: India" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>State</FormLabel>
                    <FormControl>
                      <Input placeholder="eg: Rajasthan" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>District</FormLabel>
                    <FormControl>
                      <Input placeholder="eg. Jaipur" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="landmark"
                render={({ field }) => (
                  <FormItem className="w-[48%]">
                    <FormLabel>Landmark</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="eg: Near Rambagh"
                        type="landmark"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-4">
              <Button
                className="flex items-center gap-2"
                type="submit"
                disabled={isLoading}
              >
                <p>Save Changes</p>
                {isLoading && <Loader />}
              </Button>
              <DialogClose asChild>
                <Button variant="outline" disabled={isLoading}>
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
