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
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { KeyIcon } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Verify({
  email,
  modal,
  setModal,
  setCurrentUser,
  setEmail,
}: {
  email: string;
  modal: boolean;
  setModal: any;
  setCurrentUser: any;
  setEmail:any,
}) {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [tempUser, setTempUser] = useState<any>({ email: email });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return;
    const digit = value.slice(-1);

    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    let toastId = toast.loading("Otp Validating...");

    if (!isOtpComplete()) {
      toastId = toast.error("please enter 6 digit code");
      return;
    }

    const data = {
      otp: otp.toString().replaceAll(",", ""),
      email: tempUser.email,
    };

    try {
      const result = await axios.post("/api/auth/editEmail", data);

      if (result.status == 200) {
        toast.success(result.data.message, {
          id: toastId,
        });

        setModal(!modal);
        setEmail(result.data.email);
      }
    } catch (error) {
      localStorage.removeItem("userData");

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
  }, []);

  if (!tempUser) return;

  return (
    <div className="fixed inset-0 z-[1000] grid place-items-center overflow-auto bg-[#e1e3e1]  bg-opacity-0 backdrop-blur-md">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="mx-auto w-10 h-10 rounded-full bg-primary flex items-center justify-center bg-black text-white dark:bg-white dark:text-black mb-4">
              <KeyIcon className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              Verify your account
            </h1>
            <p className="text-muted-foreground mt-2">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          <Card>
            <CardHeader>
              <div className="space-y-2">
                <CardTitle className="text-2xl text-center">
                  Enter your OTP
                </CardTitle>
                <CardDescription>
                  <p className="text-center">
                    We have sent a code to your email
                    <span className=" font-semibold ml-1">
                      {" "}
                      {tempUser.email.slice(0, 2)}**@
                      {tempUser.email.split("@")[1]}
                    </span>
                  </p>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent>
              <form
                className="flex flex-col items-center space-y-4 rounded-2xl  p-8"
                onSubmit={handleSubmit}
              >
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
                  <Button onClick={() => setModal(false)} variant="destructive">
                    Cancel
                  </Button>

                  <Button
                    type="submit"
                    variant="default"
                    className="bg-blue-500 text-white hover:bg-blue-600"
                    disabled={!isOtpComplete()}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
