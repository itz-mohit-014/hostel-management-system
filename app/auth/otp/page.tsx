"use client";

import type React from "react";

import {
  useRef,
  useState,
  useEffect,
  type KeyboardEvent,
  type ClipboardEvent,
} from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function OTPInput() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [ tempUser, setTempUser] = useState<any>(null)

  const router = useRouter()
  
  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    // Only accept numbers
    if (!/^\d*$/.test(value)) return;

    // Take the last character if multiple characters are entered
    const digit = value.slice(-1);

    // Update the OTP array
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Move to next input if a digit was entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").trim();

    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("");
      setOtp(digits);

      inputRefs.current[5]?.focus();
    }
  };

  const isOtpComplete = () => {
    return otp.every((digit) => digit !== "");
  };

  const handleSubmit = async(e:any) => {
    e.preventDefault();
    
    let toastId = toast.loading("Otp Validating...");

    if (!isOtpComplete() ) {
        toastId =  toast.error("please enter 6 digit code")
        return;
    }

    const user =  localStorage.getItem("userData") 
    && JSON.parse(localStorage.getItem("userData")!) 

    const data = {
      userData : user,  
      otp: otp.toString().replaceAll(",", "")
    }

    try {
      const result = await axios.post("/api/auth/signup", data);

      if (result.status == 200) {

        toast.success("User register successfully", {
          id: toastId,
        });

        localStorage.removeItem("userData");

        router.push("/auth/signin");
      }
      
    } catch (error) {

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong", {
          id: toastId,
        });
      } else {
        toast.error("Something went wrong", {
          id: toastId,
        });
      }
    }
  };

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);

    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      setTempUser(JSON.parse(storedUser))
    } else{
      router.push("/auth/signup"); // Redirect to /signin if no user
    }

  }, []);

  if(!tempUser) return;

  return (
    <div className="h-dvh w-dvw flex items-center justify-center">
      <form className="flex flex-col items-center space-y-4 rounded-2xl  dark:bg-white/5 p-8">
        <p className="font-semibold text-3xl">Email Verification</p>
        <p className="flex flex-row text-sm font-medium text-gray-400">
          We have sent a code to your email 
          <span className=" font-semibold ml-1"> {tempUser.email.slice(0,2)}**@{tempUser.email.split("@")[1]}</span>
        </p>

        <div className="flex space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={index === 0 ? handlePaste : undefined}
              // @ts-ignore
              ref={(el) => (inputRefs.current[index] = el)}
              className={cn(
                "w-12 h-14 text-center text-xl font-semibold border rounded-md",
                "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
                "transition-all duration-200",
                "sm:w-14 sm:h-16"
              )}
              aria-label={`Digit ${index + 1} of OTP`}
            />
          ))}
        </div>

        <div className="flex space-x-4 mt-4">
          <Link href={"/auth/signup"} className="border border-black dark:border-white px-4 rounded-md flex items-center justify-center">
            <span>Cancel</span>
          </Link>
          <Button
            type="submit"
            onClick={handleSubmit}
            disabled={!isOtpComplete()}
          >
            Submit
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
    </div>
  );
}
