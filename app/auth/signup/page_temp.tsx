"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Building2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { passwordRegex, registerSchema } from "@/common/types";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

interface IFormValue {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * @working_flow
 *   
 * 1. validate fill data.. (if any invalid throw error ) 
 * 2. save valid data to local storage then sent otp request...
 * 3. navigate to OTP page... (sent opt and save email  to db for temporary)
 * 4. validate otp
 * 5. save user credentials to db from get local storage 
 * 6. clear local storage user
 * 7. navigate new user to dashboard.
 * 
 */


export default function SignUp() {
  const [password, setPassword] = useState<boolean>(true);

  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormValue>();

  let enterPassword = watch("password", ""); 

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
      
      router.push('/auth/otp')

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

  useEffect(() => {
    localStorage.removeItem("userData");
  }, [])

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="hidden lg:block bg-muted" />
      <div className="flex items-center justify-center p-8">
        <div className="mx-auto w-full max-w-sm space-y-6">
          <div className="space-y-2 text-center">
            <Link href={"/"}>
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            </Link>
            <h1 className="text-2xl font-bold">Create an account</h1>
            <p className="text-muted-foreground">
              
            </p>
          </div>

          <form onSubmit={handleSubmit(registerHandler)} className="space-y-4">
            <div className="space-y-2">
              <Input
                {...register("name", { required: true })}
                id="name"
                placeholder="Enter your name"
                type="text"
                autoComplete="name"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">
                  Please provide full name
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("email", { required: true })}
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  Email can't be empty.
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                {...register("password" , { required: true , pattern: passwordRegex })}
                id="password"
                placeholder="Create a password"
                type="password"
                autoComplete="new-password"
              />

              {!passwordRegex.test(enterPassword) && (
                  <ul className="text-xs mt-2 text-gray-600">
                  <li className={`${enterPassword.length >= 8 ? "text-green-600" : "text-black dark:text-white"}  mb-1 text-sm `}>
                    ✅ At least 8 characters
                  </li>
                  <li className={`${/[A-Z]/.test(enterPassword) ? "text-green-600" : "text-black dark:text-white"}   mb-1 text-sm` }>
                    ✅ At least 1 uppercase letter
                  </li>
                  <li className={`${/[a-z]/.test(enterPassword) ? "text-green-600" : "text-black dark:text-white"}   mb-1 text-sm` }>
                    ✅ At least 1 lowercase letter
                  </li>
                  <li className={`${/\d/.test(enterPassword) ? "text-green-600" : "text-black dark:text-white"}   mb-1 text-sm`}>
                    ✅ At least 1 number
                  </li>
                  <li className={`${/[!@#$%^&*]/.test(enterPassword) ? "text-green-600" : "text-black dark:text-white"}   mb-1 text-sm`}>
                    ✅ At least 1 special character (!@#$%^&*)
                  </li>
                </ul>
              )} 

            </div>
            <div className="space-y-2">
              <Input
                {...register("confirmPassword" , { required: true })}
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
              href="/auth/signin"
              className="text-primary underline-offset-4 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}
