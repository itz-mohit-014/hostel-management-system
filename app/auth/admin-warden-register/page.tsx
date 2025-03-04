"use client";

import { useState } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ChevronLeft,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  MailIcon,
  LockIcon,
  BuildingIcon,
  IdCardIcon,
  InfoIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import zod from "zod";
import { AdminRegisterSchema } from "@/common/types";
import FormInput from "@/components/ui/FormInput";
import axios from "axios";

type AdminFromValues = zod.infer<typeof AdminRegisterSchema>;

export default function AdminWardenRegister() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState("warden");
  const [hostel, setHostel] = useState("boys-hostel-a");

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    resetField,
    setError,
  } = useForm<AdminFromValues>({
    resolver: zodResolver(AdminRegisterSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      staffId: "",
      department: "",
      reasonForAccess: "",
    },
  });

  const router = useRouter();

  const validateForm = (toastId: string, data: AdminFromValues): boolean => {
    let isValid = true;

    const parseData = AdminRegisterSchema.safeParse(data);

    console.log(parseData);

    if (parseData.success) {
      return isValid;
    }

    isValid = false;

    parseData.error.issues.forEach((issue) => {
      if (issue.path && issue.path.length > 0) {
        setError(issue.path[0] as keyof AdminFromValues, {
          type: "manual",
          message: issue.message,
        });
      }
    });

    const lastErrorMessage = parseData.error.issues.slice(-1)[0]?.message;

    if (lastErrorMessage) {
      toast.error(lastErrorMessage, { id: toastId });
    }

    return isValid;
  };

  const submitRegistration = async (data: AdminFromValues) => {
    toast.dismiss();
    const toastId = toast.loading("Sending OTP...");

    if (!validateForm(toastId, data)) return;

    setLoading(true);

    try {
      // need to encrupt the data.
      localStorage.setItem("userData", JSON.stringify(data)); // encrupt

      const otpData = {
        email: data.email,
        role: data.role,
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
      setLoading(false);
      
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-primary/20">
              <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <InfoIcon className="h-6 w-6" />
                </div>
                <CardTitle className="text-2xl">Verification Pending</CardTitle>
                <CardDescription>
                  Your registration request has been submitted
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <InfoIcon className="h-4 w-4" />
                  <AlertTitle>Approval Required</AlertTitle>
                  <AlertDescription>
                    Your {role} account request will be reviewed by system
                    administrators. You'll receive an email notification once
                    your account is approved.
                  </AlertDescription>
                </Alert>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                  <h3 className="font-medium">What happens next?</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>System administrators will verify your credentials</li>
                    <li>
                      You'll receive an email when your account is approved
                    </li>
                    <li>Once approved, you can log in with your credentials</li>
                  </ol>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={() => router.push("/")}
                >
                  Return to Home
                </Button>
                <p className="text-sm text-center text-muted-foreground">
                  Need help?{" "}
                  <Link
                    href="/contact"
                    className="text-primary hover:underline"
                  >
                    Contact support
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </div>
    );
  }

  const handleChangeRole = (name: any, value: any) => {
    if (name === "role") setRole(value);

    if (value == "administrator") {
      setValue("role", value);
      // resetField("assignHostel");
    } else {
      setValue(name, value);
    }
  };

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
              Staff Registration
            </h1>
            <p className="text-muted-foreground mt-2">
              Register as a warden or admin for HostelSphere
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Staff Account Registration</CardTitle>
              <CardDescription>
                Request a new staff account (requires verification)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleSubmit(submitRegistration)}
                className="space-y-4"
              >
                <div className="space-y-2">
                  <Select
                    onValueChange={(value) => handleChangeRole("role", value)}
                  >
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Warden">Warden</SelectItem>
                      <SelectItem value="Admin">
                        Administrator
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <p className="text-xs text-muted-foreground mt-1">
                    {role === "warden"
                      ? "Wardens are responsible for hostel management and student supervision"
                      : "Administrators have full system control and staff management capabilities"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    id="firstName"
                    label="First Name"
                    type="text"
                    {...register("firstName")}
                    error={errors.firstName?.message}
                    required
                  />

                  <FormInput
                    id="lastName"
                    label="Last Name"
                    type="text"
                    {...register("lastName")}
                    error={errors.lastName?.message}
                    required
                  />
                </div>

                <FormInput
                  id="email"
                  label="Email"
                  type="email"
                  icon={<MailIcon size={18} />}
                  error={errors.email?.message}
                  {...register("email")}
                  required
                />

                <FormInput
                  id="staffId"
                  label="Staff Id"
                  type="text"
                  autoComplete="name"
                  {...register("staffId")}
                  error={errors.staffId?.message}
                  icon={<IdCardIcon size={18} />}
                  required
                />

                <FormInput
                  id="department"
                  label="Department"
                  type="text"
                  autoComplete="name"
                  {...register("department")}
                  error={errors.department?.message}
                  icon={<IdCardIcon size={18} />}
                  required
                />

                { /* {role === "Warden" && (
                  <div className="space-y-2">
                    <Select
                      onValueChange={(value: any) =>
                        handleChangeRole("assignHostel", value)
                      }
                      
                    >
                      <SelectTrigger id="assignHostel">
                        <SelectValue placeholder="Select hostel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boys-hostel-a">
                          Boys Hostel A
                        </SelectItem>
                        <SelectItem value="boys-hostel-b">
                          Boys Hostel B
                        </SelectItem>
                        <SelectItem value="girls-hostel-a">
                          Girls Hostel A
                        </SelectItem>
                        <SelectItem value="girls-hostel-b">
                          Girls Hostel B
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {!hostel && (
                      <p className="text-red-500 text-xs">
                        Please select a hostel.
                      </p>
                    )}
                  </div>
                )} */ }

                <FormInput
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  icon={<LockIcon size={18} />}
                  error={errors.password?.message}
                  {...register("password")}
                  required
                />

                <div className="space-y-2">
                  <Label htmlFor="reason">Reason for Access</Label>
                  <Textarea
                    id="reason"
                    placeholder="Briefly explain why you need access to the system"
                    rows={3}
                    {...register("reasonForAccess")}
                    required
                  />
                  {errors.reasonForAccess && (
                    <p className="text-red-500 text-xs">
                      {errors.reasonForAccess.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="terms" required />
                  <label
                    htmlFor="terms"
                    className="text-sm text-muted-foreground leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    I confirm that all provided information is accurate
                  </label>
                </div>

                <Alert className="bg-amber-50 border-amber-200">
                  <InfoIcon className="h-4 w-4 text-amber-500 dark:text-amber-900" />
                  <AlertTitle className="text-amber-800">
                    Account Verification Required
                  </AlertTitle>
                  <AlertDescription className="text-amber-700 text-sm">
                    Staff accounts require verification by system
                    administrators. You'll receive an email notification once
                    your account is approved.
                  </AlertDescription>
                </Alert>

                <Button
                  className="w-full mt-6"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Submitting request..." : "Submit for Approval"}
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
