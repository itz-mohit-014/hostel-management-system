"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  IdCardIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { studentRegisterSchema } from "@/common/types";
import FormInput from "@/components/ui/FormInput";
import axios from "axios";

type SignUpFormData = Zod.infer<typeof studentRegisterSchema>;

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  studentId?: string;
  courseName?: string;
  otherCourseName?: string;
  password?: string;
  acceptTerms?: boolean;
}

export default function Register() {

  const [formData, setFormData] = useState<SignUpFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    studentId: "",
    courseName: "",
    otherCourseName: "",
    acceptTerms: false,
    role:"Student"
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const validateForm = (toastId: string): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const parseData = studentRegisterSchema.safeParse(formData);

    console.log(parseData);

    if (!parseData.success) {
      parseData.error.issues.map((issue) => {
        // @ts-ignore
        newErrors[issue.path[0]] = issue.message;
        isValid = false;
      });
    }

    const lastErrorMessage = Object.values(newErrors).slice(-1)[0];

    if (lastErrorMessage) {
      toast.dismiss();
      toast.error(lastErrorMessage, { id: toastId });
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | any) => {
    const { name, value } = e.target ? e.target : e;
    console.log(name, value);

    if (name === "courseName" && value !== "other") {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        otherCourseName: "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    toast.dismiss();
    const toastId = toast.loading("Sending OTP...");

    if (!validateForm(toastId)) return;

    setIsSubmitting(true);

    console.log(formData);

    try {
      // need to encrupt the data.
      localStorage.setItem("userData", JSON.stringify(formData)); 
      
      const otpData = {
        email: formData.email,
        role : 'Student'
      };
      
      const generateOtp = await axios.post("/api/auth/otp", otpData);
      
      if (generateOtp.data.success) {
        toast.success(generateOtp.data.message, {
          id: toastId,
        });
        router.push("/auth/otp");
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
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6"
            >
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Home
            </Link>
            <div className="mx-auto w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white dark:text-black mb-4">
              <UserIcon className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              Create your student account
            </h1>
            <p className="text-muted-foreground mt-2">
              Join HostelSphere as a student
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Registration</CardTitle>
              <CardDescription>
                Create a new student account to access HostelSphere
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    id="firstName"
                    name="firstName"
                    label="Fist Name"
                    type="text"
                    autoComplete="name"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    required
                  />

                  <FormInput
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    autoComplete="name"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    required
                  />
                  
                </div>

                <FormInput
                  id="email"
                  name="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={<MailIcon size={18} />}
                  required
                />

                <FormInput
                  id="studentId"
                  name="studentId"
                  label="Student Id"
                  type="text"
                  autoComplete="name"
                  value={formData.studentId}
                  onChange={handleChange}
                  error={errors.studentId}
                  icon={<IdCardIcon size={18} />}
                  required
                />

                <div className="space-y-2">
                  <Label htmlFor="course">Course/Program</Label>
                  <Select
                    onValueChange={(value) =>
                      handleChange({ name: "courseName", value })
                    }
                  >
                    <SelectTrigger id="courseName">
                      <SelectValue placeholder="Select course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cse">Computer Science</SelectItem>
                      <SelectItem value="ece">
                        Electronics Engineering
                      </SelectItem>
                      <SelectItem value="mech">
                        Mechanical Engineering
                      </SelectItem>
                      <SelectItem value="civil">Civil Engineering</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {formData.courseName === "other" && (
                    <FormInput
                      id="otherCourseName"
                      name="otherCourseName"
                      label="Other Course/Program"
                      type="text"
                      autoComplete="name"
                      value={formData.otherCourseName}
                      onChange={handleChange}
                      error={errors.otherCourseName}
                      required
                    />
                  )}
                </div>

                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  icon={<LockIcon size={18} />}
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  required
                />

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      terms of service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      privacy policy
                    </Link>
                  </label>
                </div>

                <Button
                  className="w-full mt-6"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? "Creating account..."
                    : "Create student account"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{" "}
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
    </div>
  );
}
