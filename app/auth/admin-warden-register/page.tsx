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

const adminSchema = zod
  .object({
    // role: zod.enum(["warden", "administrator"]),
    firstName: zod.string({ message: "First name can't be empty" }),
    lastName: zod.string({ message: "Last name can't be empty" }),
    email: zod.string().email("Please enter a valid email address"),
    password: zod.string().min(8, "Password must be at least 8 characters"),
    staffId: zod.string({ message: "Staff ID can't be empty" }),
    department: zod.string({ message: "Department can't be empty" }),
    reasonForAccess: zod.string({
      message: "Please describe reason for access shortly",
    })
  })

  // assignHostel: zod
  //   .enum([
  //     "boys hostel a",
  //     "boys hostel b",
  //     "girls hostel a",
  //     "girls hostel b",
  //   ])
  //   .optional(),

type AdminFromValues = zod.infer<typeof adminSchema>;

export default function AdminWardenRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [role, setRole] = useState("warden");
  const [hostel, setHostel] = useState("");

  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues
  } = useForm<AdminFromValues>({
    resolver: zodResolver(adminSchema),
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

  const submitRegistration = (data:AdminFromValues) => {
    // e.preventDefault();
    // setLoading(true);
    
console.log(data)
console.log(role , hostel)
console.log(getValues());
console.log(errors)
    // Simulate registration and verification request
    // setTimeout(() => {
    //   setLoading(false);
    //   setSubmitted(true);
    //   toast("Registration Submitted");
    // }, 1500);
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
                  <Label htmlFor="account-type">Role</Label>
                  <Select defaultValue="warden" onValueChange={(value) => setRole(value)}>
                    <SelectTrigger id="account-type">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warden">Warden</SelectItem>
                      <SelectItem value="administrator">Administrator</SelectItem>
                    </SelectContent>
                  </Select>

                  <p className="text-xs text-muted-foreground mt-1">
                    {role === "warden"
                      ? "Wardens are responsible for hostel management and student supervision"
                      : "Administrators have full system control and staff management capabilities"}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstname">First Name</Label>
                    <Input
                      id="firstname"
                      placeholder="Enter first name"
                      {...register("firstName")}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-xs">
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="lastname">Last Name</Label>
                    <Input
                      id="lastname"
                      placeholder="Enter last name"
                      {...register("lastName")}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-xs">
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MailIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      autoCapitalize="none"
                      autoCorrect="off"
                      className="pl-10"
                      {...register("email")}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-xs">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="staff-id">Staff ID</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IdCardIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="staff-id"
                      placeholder="Enter your staff ID"
                      className="pl-10"
                      {...register("staffId")}
                      required
                    />
                  </div>
                  {errors.staffId && (
                    <p className="text-red-500 text-xs">
                      {errors.staffId.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <BuildingIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="department"
                      placeholder="Enter your department"
                      className="pl-10"
                      {...register("department")}
                      required
                    />
                  </div>
                  {errors.department && (
                    <p className="text-red-500 text-xs">
                      {errors.department.message}
                    </p>
                  )}
                </div>

                {role === "warden" && (
                  <div className="space-y-2">
                    <Label htmlFor="hostel">Assigned Hostel</Label>
                    <Select defaultValue="boys-hostel-a" onValueChange={(value) => setHostel(value)}>
                      <SelectTrigger id="hostel">
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
                )}

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <LockIcon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a password"
                      className="pl-10 pr-10"
                      {...register("password")}
                      required
                    />
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
                  {errors.password && (
                    <p className="text-red-500 text-xs">
                      {errors.password.message}
                    </p>
                  )}
                </div>

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
                  <InfoIcon className="h-4 w-4 text-amber-500" />
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
