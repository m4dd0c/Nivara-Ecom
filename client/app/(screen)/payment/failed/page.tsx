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
import CancelIcon from "@mui/icons-material/Cancel";
import { useRouter } from "next/navigation";

export default function CardWithForm() {
  const router = useRouter();
  return (
    <div className="grid h-screen place-items-center">
      <Card className="w-4/6">
        <CardHeader>
          <CardTitle>
            <CancelIcon className="size-12 text-red-500" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <h1 className="text-3xl font-semibold">Payment Failed :(</h1>
          <p className="mt-4 text-sm">
            If amount is debited from your account, it will be refunded within 7
            days.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={() => router.replace("/")}>Home</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
