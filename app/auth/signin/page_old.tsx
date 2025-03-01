"use client"

import { useState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";
import AuthLayout from "@/components/layouts/AuthLayout";
import FormInput from "@/components/ui/FormInput";
import toast from "react-hot-toast";
import { loginValidation } from "@/common/types";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import FormLayout from "../layout";

interface SigninFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

const Signin = () => {
  const [formData, setFormData] = useState<SigninFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    toast.dismiss();
    const id = toast.loading("...Loggin in");

    const parseData = loginValidation.safeParse(formData);

    if (!parseData.success) {
      toast.error("Invalid credentials", {
        id: id,
      });

      setIsSubmitting(false);
      
      return;
    }

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        throw new Error(result?.error);
      }

      if (result?.ok) {
        toast.success("Logged in Successfully", {
          id: id,
        });

        router.push("/dashboard");
      }
      
    } catch (error) {
      const err = (error as Error).message || "something went wrong.";
      toast.error(err, {
        id: id,
      });
      
      console.log(error)

    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to access your account"
      authType="signin"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
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
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
          icon={<Lock size={18} />}
          required
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              className="h-4 w-4 rounded border-input bg-background focus:ring-primary"
              checked={formData.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor="rememberMe" className="text-sm text-foreground/70">
              Remember me
            </label>
          </div>
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center items-center py-3 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 shadow transition-all duration-200 ease-in-out transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            "Sign in"
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

export default Signin;
