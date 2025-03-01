"use client"

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      toast("Login Successful");
    }, 1500);
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
              <LockIcon className="h-5 w-5" />
            </div>
            <h1 className="text-2xl font-display font-bold">Log in to HostelSphere</h1>
            <p className="text-muted-foreground mt-2">
              Access your account to manage hostel operations
            </p>
          </div>

          <Tabs 
            defaultValue="student" 
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="warden">Warden</TabsTrigger>
              <TabsTrigger value="admin">Admin</TabsTrigger>
            </TabsList>

            {["student", "warden", "admin"].map((role) => (
              <TabsContent key={role} value={role}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      {role.charAt(0).toUpperCase() + role.slice(1)} Login
                    </CardTitle>
                    <CardDescription>
                      {role === "student" 
                        ? "Enter your credentials to access your student account" 
                        : `Enter your credentials to access your ${role} account`}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`${role}-email`}>Email</Label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <MailIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id={`${role}-email`}
                            placeholder="Enter your email"
                            type="email"
                            autoCapitalize="none"
                            autoCorrect="off"
                            className="pl-10"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor={`${role}-password`}>Password</Label>
                          <Link 
                            href="/auth/forgot-password" 
                            className="text-xs text-primary hover:underline"
                          >
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <LockIcon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <Input
                            id={`${role}-password`}
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="pl-10 pr-10"
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
                      </div>
                      <Button 
                        className="w-full mt-6" 
                        type="submit" 
                        disabled={loading}
                      >
                        {loading ? "Signing in..." : "Sign in"}
                      </Button>
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    {role === "student" ? (
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link href="/auth/signup" className="text-primary hover:underline">
                          Sign up
                        </Link>
                      </p>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Need a {role} account?{" "}
                        <Link href="/auth/admin-warden-register" className="text-primary hover:underline">
                          Request access
                        </Link>
                      </p>
                    )}
                  </CardFooter>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
