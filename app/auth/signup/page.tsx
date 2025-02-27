"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerSchema } from "@/common/types";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFormValue {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [password, setPassword] = useState<boolean>(true);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormValue>();

  const registerHandler = async (data: IFormValue) => {
    const id = toast.loading("Sending OTP...");
    if (data.password !== data.confirmPassword) {
      setPassword(false);
      return;
    }

    try {
      const parseData = registerSchema.safeParse(data);

      if (!parseData.success) {
        toast.error("Please enter valid data", {
          id: id,
        });
        return;
      }

      localStorage.setItem("userData", JSON.stringify(parseData.data));

      const otpData = {
        email: parseData.data.email,
      };

      const generateOtp = await axios.post("/api/auth/otp", otpData);
      if(generateOtp.data.success){
        toast.success(generateOtp.data.message,{
          id:id
        })
        router.push('/auth/otp')
      }
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          id: id,
        });
      } else {
        toast.error("Something went wrong", {
          id: id,
        });
      }
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted" />
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              Enter your information to create your account
            </p>
          </div>

          <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("name")}
                id="name"
                placeholder="Enter your name"
                type="text"
                autoComplete="name"
              />
            </div>
            <div className="space-y-2">
              <Input
                {...register("email")}
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input
                {...register("password")}
                id="password"
                placeholder="Create a password"
                type="password"
                autoComplete="new-password"
              />
            </div>
            <div className="space-y-2">
              <Input
                {...register("confirmPassword")}
                id="confirmPassword"
                placeholder="Confirm your password"
                type="password"
                autoComplete="new-password"
              />

              {!password && (
                <p className="text-red-500 text-sm">
                  Password and Confirm password can not be different
                </p>
              )}
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
