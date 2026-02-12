"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "$/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "$/components/ui/button";
import CloseIcon from "@mui/icons-material/Close";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "$/components/ui/form";
import { Loader2 } from "lucide-react";
import { Input } from "$/components/ui/input";
import { useEffect, useState } from "react";
import { useToast } from "$/hooks/use-toast";
import {
  useSendOtpMutation,
  useSignUpFormMutation,
  useVerifyOtpMutation,
} from "$/store/services/user";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function SignupDialog() {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentForm, setCurrentForm] = useState<number>(1);
  const [otpField, setOtpField] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [signupForm, setSignupForm] = useState({
    name: "",
    phone: "",
    password: "",
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const [sendOtp, { isLoading, isError, isSuccess }] = useSendOtpMutation();
  const [
    verifyOtp,
    {
      isLoading: loadingVerify,
      isError: errorVerify,
      isSuccess: successVerify,
    },
  ] = useVerifyOtpMutation();

  const [
    signUpForm,
    {
      isLoading: loadingSignup,
      isError: errorSignup,
      isSuccess: successSignup,
    },
  ] = useSignUpFormMutation();

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendOtp({ email: values.email })
      .unwrap()
      .then(() => {
        console.log("OTP sent successfully!");
        setCurrentEmail(values.email);
        setCurrentForm(2);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        toast({
          variant: "destructive",
          title: "Failed to send OTP",
          description: error?.data?.message || "Please try again.",
        });
        setCurrentForm(1);
      });
  }

  const onChangeHandlerForOtp = (e: any) => {
    console.log(e.target.value);
    setOtpField(e.target.value);
  };

  const otpVerifyHandler = async () => {
    console.log("otpField in the handler", otpField, typeof otpField);
    verifyOtp({ email: currentEmail, otp: otpField })
      .unwrap()
      .then(() => {
        console.log("Otp verified successfully");
        setCurrentForm(3);
      })
      .catch((e) => {
        console.log("Otp verified failed", e);
        toast({
          variant: "destructive",
          title: "OTP verification failed",
          description: e?.data?.message || "Please try again.",
        });
        setCurrentForm(2);
      });
  };
  const onChangeHandlerForFinalForm = (e: any) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
    console.log(signupForm);
  };
  const finalForm = async () => {
    const { name, phone, password } = signupForm;
    if (confirmPassword !== password)
      return toast({
        variant: "destructive",
        title: "Uh oh! Signup failed",
        description: "Passwords do not match.",
      });
    else
      signUpForm({
        name,
        email: currentEmail,
        password,
        phone,
      })
        .unwrap()
        .then((result) => {
          console.log("Signup Successfully Done");
          // Store the JWT token
          if (result.token) {
            localStorage.setItem("token", result.token);
          }
          toast({
            title: `Hi ${name}!`,
            description: "Your account is created successfully.",
          });
          setOpenDialog(false);
        })
        .catch((error) => {
          console.log("Signup Failed", error);
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description:
              error?.data?.message || "There was a problem with your request.",
          });
        });
  };

  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setOpenDialog(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);
  return (
    <div>
      {(currentForm === 1 && (
        <Dialog open={openDialog}>
          <DialogTrigger asChild>
            <button
              className="my-2 cursor-pointer text-sm font-light text-foreground hover:bg-muted-foreground/5 max-lg:text-xl md:rounded-md md:border md:p-2"
              onClick={() => setOpenDialog(true)}
            >
              Signup
            </button>
          </DialogTrigger>
          <DialogContent className="rounded-lg border sm:max-w-[420px]">
            <DialogHeader>
              <div className="flex justify-between">
                <div className="">
                  <DialogTitle className="mb-1 text-left">
                    Create your account
                  </DialogTitle>

                  <DialogDescription className="text-left">
                    Type your email address to generate OTP.
                  </DialogDescription>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => setOpenDialog(false)}
                >
                  <CloseIcon className="text-foreground" fontSize="small" />
                </div>
              </div>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="float-end"
                >
                  {isLoading ? "Sending..." : "Next"}
                </Button>
                {isError && (
                  <p className="text-sm text-red-800">Failed to send OTP</p>
                )}
                {isSuccess && (
                  <p className="text-green-800">OTP sent successfully!</p>
                )}
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )) ||
        (currentForm === 2 && (
          <Dialog open={openDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenDialog(true)} variant="outline">
                Signup
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg border sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex justify-between">
                  <div className="">
                    <DialogTitle className="mb-1 text-left">
                      Verify your OTP!
                    </DialogTitle>
                    <DialogDescription className="text-left">
                      Enter the OTP sent to {currentEmail}
                    </DialogDescription>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setOpenDialog(false)}
                  >
                    <CloseIcon
                      className="text-foreground"
                      fontSize="small"
                      color="action"
                    />
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">OTP</p>
                  <Input
                    type="text"
                    placeholder="XXXX"
                    onChange={onChangeHandlerForOtp}
                  />
                </div>
                {process.env.NEXT_PUBLIC_SKIP_TWILIO && (
                  <span className="font-regular text-xs text-muted-foreground uppercase">
                    use <span className="text-yellow-300">any</span> 6-digit OTP
                    in <span className="text-yellow-300">for Testing.</span>
                  </span>
                )}
                <div className="flex justify-between">
                  <Button
                    variant={"outline"}
                    onClick={() => setCurrentForm(1)}
                    disabled={loadingVerify}
                  >
                    Prev
                  </Button>
                  <Button onClick={otpVerifyHandler} disabled={loadingVerify}>
                    {loadingVerify ? "Verifying..." : "Verify"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )) ||
        (currentForm === 3 && (
          <Dialog open={openDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => setOpenDialog(true)}>
                Signup
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-lg border sm:max-w-[425px]">
              <DialogHeader>
                <div className="flex justify-between">
                  <div className="">
                    <DialogTitle className="mb-1 text-left">
                      Signup Form
                    </DialogTitle>
                    <DialogDescription className="text-left">
                      Fill the below information to register you account.
                    </DialogDescription>
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => setOpenDialog(false)}
                  >
                    <CloseIcon
                      className="text-foreground"
                      fontSize="small"
                      color="action"
                    />
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Name</p>
                  <Input
                    type="text"
                    placeholder="John Cena"
                    onChange={onChangeHandlerForFinalForm}
                    value={signupForm.name}
                    name="name"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Email</p>
                  <Input
                    type="email"
                    placeholder="abc@gmail.com"
                    value={currentEmail}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Phone Number</p>
                  <Input
                    type="tel"
                    placeholder="+1234567890"
                    onChange={onChangeHandlerForFinalForm}
                    name="phone"
                    value={signupForm.phone}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold">Password</p>
                  <Input
                    type="password"
                    placeholder="Create Password"
                    onChange={onChangeHandlerForFinalForm}
                    name="password"
                    value={signupForm.password}
                  />
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-semibold">Confirm Password</p>
                  <Input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    name="confirmPassword"
                  />
                </div>
                <Button
                  onClick={finalForm}
                  className="float-right"
                  disabled={loadingSignup}
                >
                  {loadingSignup ? (
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 animate-spin" />
                      <p>Signup</p>
                    </div>
                  ) : (
                    <p>Signup</p>
                  )}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
    </div>
  );
}
