"use client";

import { Button } from "$/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "$/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "$/components/ui/form";
import { Input } from "$/components/ui/input";
import CloseIcon from "@mui/icons-material/Close";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "$/hooks/use-toast";
import { useLoginFormMutation } from "$/store/services/user";

// Schema with username and password validation
const formSchema = z.object({
  email: z
    .string()
    .min(2, { message: "Username must be at least 2 characters." }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." }),
});

export function LoginDialog() {
  const [loginForm, { isLoading }] = useLoginFormMutation();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "user@test.com",
      password: "testing123",
    },
  });
  // Submit handler
  function onSubmit(values: z.infer<typeof formSchema>) {
    const { email, password } = values;
    loginForm({ email, password })
      .unwrap()
      .then((res: any) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        toast({
          title: `Welcome back!`,
          description: "You have logged in successfully.",
        });
        setIsDialogOpen(false);
        // The User tag invalidation in user.ts will trigger a refetch of 'me' query
      })
      .catch((e: any) => {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: e?.data?.message || "Invalid email or password.",
        });
      });
  }

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setIsDialogOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <Dialog open={isDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="text-foreground md:hover:bg-muted-foreground/5 my-2 cursor-pointer text-sm font-light max-lg:text-xl md:rounded-md md:border md:p-2"
          onClick={() => setIsDialogOpen(true)}
        >
          Login
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-lg border sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex justify-between">
            <div className="">
              <DialogTitle className="mb-1 text-left">Login</DialogTitle>
              <DialogDescription className="text-left">
                Type the below information to log in to your account.
              </DialogDescription>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => setIsDialogOpen(false)}
            >
              <CloseIcon className="text-foreground" fontSize="small" />
            </div>
          </div>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Username Field */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email, e.g., john@doe.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Make sure your password is strong.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 animate-spin" />
                  <p>Login</p>
                </div>
              ) : (
                <p>Login</p>
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
