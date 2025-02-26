"use client"

import type React from "react"

import { useRef, useState, useEffect, type KeyboardEvent, type ClipboardEvent } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export default function OTPInput() {
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value

    // Only accept numbers
    if (!/^\d*$/.test(value)) return

    // Take the last character if multiple characters are entered
    const digit = value.slice(-1)

    // Update the OTP array
    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    // Move to next input if a digit was entered
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  // Handle key press
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    // Handle arrow keys for navigation
    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }


  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData("text/plain").trim()


    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split("")
      setOtp(digits)


      inputRefs.current[5]?.focus()
    }
  }

 
  const isOtpComplete = () => {
    return otp.every((digit) => digit !== "")
  }


  const handleSubmit = () => {
    if (isOtpComplete()) {

      alert(`OTP submitted: ${otp.join("")}`)
    }
  }


  const handleCancel = () => {
    setOtp(Array(6).fill(""))
    inputRefs.current[0]?.focus()
  }


  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6)
  }, [])

  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-xl font-semibold">Enter Verification Code</h2>
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
              "sm:w-14 sm:h-16",
            )}
            aria-label={`Digit ${index + 1} of OTP`}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground">We've sent a 6-digit code to your phone</p>
      <div className="flex space-x-4 mt-4">
        <Button variant="outline" onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} disabled={!isOtpComplete()}>
          Submit
        </Button>
      </div>
    </div>
  )
}

