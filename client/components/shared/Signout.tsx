import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "$/hooks/use-toast";
import { useLogOutMutation } from "$/store/services/user";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

const Signout = () => {
  const [logout, { isLoading }] = useLogOutMutation() as any;
  const router = useRouter();

  const signOutHandler = async () => {
    try {
      await logout().unwrap();
      localStorage.removeItem("token");
      router.push("/");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: error?.data?.message || "Uh oh! Failed to sign-out.",
        description: "Something went wrong.",
      });
    }
  };

  return (
    <>
      <Button
        onClick={signOutHandler}
        className="text-sm"
        disabled={isLoading}
        variant={"outline"}
      >
        {isLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="w-5 animate-spin" />
            <p>Logout</p>
          </div>
        ) : (
          <p>Logout</p>
        )}
      </Button>
    </>
  );
};

export default Signout;
