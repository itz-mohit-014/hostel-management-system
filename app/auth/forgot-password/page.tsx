"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ChevronLeft,
  KeyIcon,
  MailIcon,
  EyeIcon,
  EyeOffIcon,
  LockIcon,
} from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be exactly 6 digits"),
});

const passwordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type EmailFormValues = z.infer<typeof emailSchema>;
type OTPFormValues = z.infer<typeof otpSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ForgotPassword() {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    return () => {
      emailForm.reset();
      otpForm.reset();
      passwordForm.reset();
    };
  }, []);

  const getProgress = () => {
    switch (step) {
      case "email":
        return 0;
      case "otp":
        return 50;
      case "password":
        return 100;
      default:
        return 0;
    }
  };

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = (values: EmailFormValues) => {
    setLoading(true);
    setEmail(values.email);

    setTimeout(() => {
      setLoading(false);
      setStep("otp");
      toast("Verification code sent");
    }, 1500);
  };

  const onOTPSubmit = (values: OTPFormValues) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setStep("password");
      toast("Verification successful");
    }, 1500);
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast("Password reset successful");
      router.push("/login");
    }, 1500);
  };

  return ( 
  <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Login
            </Link>
            <div className="mx-auto w-10 h-10 rounded-full bg-primary flex items-center justify-center bg-black text-white dark:bg-white dark:text-black mb-4">
              <KeyIcon className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              Reset your password
            </h1>
            <p className="text-muted-foreground mt-2">
              {step === "email" &&
                "Enter your email to receive a verification code"}
              {step === "otp" && "Enter the 6-digit code sent to your email"}
              {step === "password" && "Create a new password for your account"}
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl text-center">
                  {step === "email" && "Verify Email"}
                  {step === "otp" && "Verify Code"}
                  {step === "password" && "New Password"}
                </CardTitle>
                <CardDescription>
                  {step === "email" &&
                    "We'll send a verification code to this email"}
                  {step === "otp" &&
                    `We've sent a verification code to ${email}`}
                  {step === "password" && "Set a new password for your account"}
                </CardDescription>

                <div className="flex items-center justify-between relative py-4 z-0">
                <span className={`font-semibold h-8 w-8  rounded-full border-2 inline-flex items-center justify-center ${getProgress() > 0 ?  "border-black dark:border-white text-black dark:text-white dark:bg-black bg-white" : "border-white dark:border-black text-white dark:text-black dark:bg-white bg-black" }`}>
                  1
                </span>
               
                <span className={`font-semibold h-8 w-8  rounded-full border-2 inline-flex items-center justify-center ${getProgress() > 50 ?  "border-black dark:border-white text-black dark:text-white dark:bg-black bg-white" : "border-white dark:border-black text-white dark:text-black dark:bg-white bg-black" }`}>
                  2
                </span>
               
                <span className={`font-semibold h-8 w-8  rounded-full border-2 inline-flex items-center justify-center ${getProgress() > 100 ?  "border-black dark:border-white text-black dark:text-white dark:bg-black bg-white" : "border-white dark:border-black text-white dark:text-black dark:bg-white bg-black" }`}>
                  3
                </span>
               
                <Progress value={getProgress()} className="h-2 absolute top-1/2 -translate-y-1/2 z-[-1] left-0" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Step 1: Email Form */}
              {step === "email" && (
                <Form {...emailForm}>
                  <form
                    onSubmit={emailForm.handleSubmit(onEmailSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <MailIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormControl>
                              <Input
                                placeholder="Enter your email"
                                type="email"
                                autoCapitalize="none"
                                autoCorrect="off"
                                className="pl-10"
                                {...field}
                              />
                            </FormControl>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button
                      className="w-full mt-4"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send verification code"}
                    </Button>
                  </form>
                </Form>
              )}

              {/* Step 2: OTP Form */}
              {step === "otp" && (
                <Form {...otpForm}>
                  <form
                    onSubmit={otpForm.handleSubmit(onOTPSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={otpForm.control}
                      name="otp"
                      render={({ field }) => (
                        <FormItem className="flex flex-col space-y-2">
                          <FormLabel>Verification Code</FormLabel>
                          <FormControl>
                            <div className="flex justify-center">
                              <InputOTP maxLength={6} {...field} autoFocus>
                                <InputOTPGroup className="gap-3">
                                  <InputOTPSlot
                                    index={0}
                                    className="w-12 h-12 text-lg"
                                  />
                                  <InputOTPSlot
                                    index={1}
                                    className="w-12 h-12 text-lg"
                                  />
                                  <InputOTPSlot
                                    index={2}
                                    className="w-12 h-12 text-lg"
                                  />
                                  <InputOTPSlot
                                    index={3}
                                    className="w-12 h-12 text-lg"
                                  />
                                  <InputOTPSlot
                                    index={4}
                                    className="w-12 h-12 text-lg"
                                  />
                                  <InputOTPSlot
                                    index={5}
                                    className="w-12 h-12 text-lg"
                                  />
                                </InputOTPGroup>
                              </InputOTP>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="flex flex-col space-y-2">
                      <Button
                        className="w-full"
                        type="submit"
                        disabled={loading}
                      >
                        {loading ? "Verifying..." : "Verify code"}
                      </Button>
                      <Button
                        variant="link"
                        className="text-xs"
                        type="button"
                        onClick={() => setStep("email")}
                      >
                        Back to email
                      </Button>
                    </div>

                    <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't recieve code?</p>{" "}
                      <a
                        className="flex flex-row items-center text-blue-600"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div>
                  </form>
                </Form>
              )}

              {/* Step 3: Password Form */}
              {step === "password" && (
                <Form {...passwordForm}>
                  <form
                    onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={passwordForm.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <LockIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormControl>
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter new password"
                                className="pl-10 pr-10"
                                {...field}
                              />
                            </FormControl>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-muted-foreground hover:text-primary"
                              >
                                {showPassword ? (
                                  <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                  <EyeIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <LockIcon className="h-4 w-4 text-muted-foreground" />
                            </div>
                            <FormControl>
                              <Input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm your password"
                                className="pl-10 pr-10"
                                {...field}
                              />
                            </FormControl>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="text-muted-foreground hover:text-primary"
                              >
                                {showConfirmPassword ? (
                                  <EyeOffIcon className="h-4 w-4" />
                                ) : (
                                  <EyeIcon className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button className="w-full" type="submit" disabled={loading}>
                      {loading ? "Resetting..." : "Reset password"}
                    </Button>
                  </form>
                </Form>
              )}
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Remember your password?{" "}
                <Link
                  href="/auth/signin"
                  className="text-primary hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </motion.div>
      </div>
  );
}
