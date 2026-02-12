"use client";
import * as React from "react";

import { Button } from "$/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "$/components/ui/card";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/navigation";

export default function CardWithForm() {
  const router = useRouter();
  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-4/6">
        <CardHeader>
          <CardTitle>
            <CheckCircleIcon className="size-12 text-green-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">Payment Succeeded!</h1>
          <p className="mt-4 text-sm">
            Thank you for visiting and buying our product. See your orders.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => router.replace("/order")}>Orders</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
