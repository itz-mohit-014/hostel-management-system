"use client";

import { ReactNode } from "react";
import ThemeToggleBtn from "../theme-toggle-btn";
import Link from "next/link";
import { Building2 } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  authType: "signin" | "signup";
}

const AuthLayout = ({
  children,
  title,
  subtitle,
  authType,
}: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div
        className="absolute -z-10 inset-0 bg-background"
        aria-hidden="true"
      />

      <div
        className="absolute -z-10 inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full bg-primary/5 dark:bg-primary/10 blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl opacity-50" />
      </div>

      <header className="py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-serif font-semibold">
            <span className="heading-gradient">Hostel</span>
            <span className="text-primary dark:text-primary">Haven</span>
          </h1>
        </Link>
        <ThemeToggleBtn />
      </header>

      <main className="flex-1 grid lg:grid-cols-2">
        <div className="hidden lg:block bg-muted" />
        <div className="flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade">
            <Link href={"/"} className="w-fit inline-block">
            <Building2 className="mx-auto h-12 w-12 text-primary" />
            </Link>
              <h1 className="text-2xl font-bold tracking-tight mb-2 heading-gradient">
                {title}
              </h1>
            <p className="text-muted-foreground">{subtitle}</p>
            </div>

            <div className="glass glass-dark rounded-2xl p-6 shadow-lg animate-slide-up">
              {children}

              <div className="mt-6 text-center text-sm pt-4">
                {authType === "signin" ? (
                  <p className="text-foreground/70">
                    Don't have an account?{" "}
                    <Link
                      href="/auth/signup"
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Sign up
                    </Link>
                  </p>
                ) : (
                  <p className="text-foreground/70">
                    Already have an account?{" "}
                    <Link
                      href="/auth/signin"
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      Sign in
                    </Link>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-sm text-foreground/50">
        <p>© {new Date().getFullYear()} HostelHaven. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AuthLayout;
