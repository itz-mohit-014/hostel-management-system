"use client"

import { useEffect, useState } from "react";
import { Mail, Lock, User, Github, Twitter } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import FormInput from "@/components/ui/FormInput";
import SocialButton from "@/components/SocialButton";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { passwordRegex, registerSchema } from "@/common/types";
import { parseEnv } from "util";
import { string } from "zod";
import axios from "axios";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  acceptTerms?: string;
}

const SignUp = () => {
  const [formData, setFormData] = useState<SignUpFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const validateForm = (toastId:string): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const parseData = registerSchema.safeParse(formData);

    console.log(parseData);

      if (!parseData.success) {

        parseData.error.issues.map((issue) => {
          // @ts-ignore
          newErrors[issue.path[0]] = issue.message;
          isValid = false;
        })

      }

      if(formData.password !== formData.confirmPassword){
        newErrors.confirmPassword = "password is not match";
        isValid = false;
      }

      const lastErrorMessage = Object.values(newErrors).slice(-1)[0];
      
      if(lastErrorMessage){
        toast.dismiss();
        toast.error(lastErrorMessage, { id: toastId});
      }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // const registerHandler = async (data:SignUpFormData) => {
  //   const id = toast.loading("Sending OTP...");
    

  //   try {
  //     const parseData = registerSchema.safeParse(data);

  //     if (!parseData.success) {
  //       toast.error("Please enter valid data", {
  //         id: id,
  //       });
  //       return;
  //     }

  //     if (formData.password !== formData.confirmPassword) {
  //       newErrors.confirmPassword = "Passwords do not match";
  //       isValid = false;
  //     }

  //     localStorage.setItem("userData", JSON.stringify(parseData.data));

  //     const otpData = {
  //       email: parseData.data.email,
  //     };

  //     const generateOtp = await axios.post("/api/auth/otp", otpData);

  //     if(generateOtp.data.success){
  //       toast.success(generateOtp.data.message,{
  //         id:id
  //       })
  //       router.push('/auth/otp')
  //     }
      
  //     router.push('/auth/otp')

  //   } catch (error) {
  //     if (axios.isAxiosError(error)) {
  //       toast.error(error.response?.data?.message || "Something went wrong", {
  //         id: id,
  //       });
  //     } else {
  //       toast.error("Something went wrong", {
  //         id: id,
  //       });
  //     }
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Sending OTP...");
    
    if (!validateForm(toastId)) return;
    
    setIsSubmitting(true);
    
    try {

      localStorage.setItem("userData", JSON.stringify(formData));

      const otpData = {
        email: formData.email,
      };

      const generateOtp = await axios.post("/api/auth/otp", otpData);

      if(generateOtp.data.success){

        toast.success(generateOtp.data.message,{
          id:toastId
        })

        router.push('/auth/otp')
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
      
    } finally {

      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    localStorage.removeItem("userData");
  }, [])

  return (
    <AuthLayout 
      title="Create an Account" 
      subtitle="Enter your information to create your account"
      authType="signup"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          id="name"
          name="name"
          label="Full Name"
          type="text"
          autoComplete="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          icon={<User size={18} />}
          required
        />

        <FormInput
          id="email"
          name="email"
          label="Email Address"
          type="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          icon={<Mail size={18} />}
          required
        />

        <FormInput
          id="password"
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<Lock size={18} />}
          required
        />

        <FormInput
          id="confirmPassword"
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          autoComplete="new-password"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          icon={<Lock size={18} />}
          required
        />

        <div className="flex items-start space-x-2">
          <input
            id="acceptTerms"
            name="acceptTerms"
            type="checkbox"
            className="h-4 w-4 mt-1 rounded border-input bg-background focus:ring-primary"
            checked={formData.acceptTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="acceptTerms" className="text-sm text-foreground/70">
            I agree to the{" "}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-primary hover:text-primary/80 transition-colors">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-destructive text-xs mt-1">{errors.acceptTerms}</p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-3 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>

        <div className="relative mt-6">
          <div className="absolute inset-0 flex items-center flex-col">
            <div className="w-full border-t border-border"></div>
            <div className="w-full"></div>
          </div>
        </div>

      </form>
    </AuthLayout>
  );
};

export default SignUp;
