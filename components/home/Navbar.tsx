
import { useState, useEffect } from "react";
import { Menu, X, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import ThemeToggle from "../theme-toggle-btn";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled ? "py-3 shadow-sm dark:bg-black/90 bg-white/80" : "py-5 bg-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <h1 className="text-xl font-serif font-semibold">
            <span className="heading-gradient">Hostel</span>
            <span className="text-primary dark:text-primary">Haven</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
          <Link href="#home" className="animated-link text-foreground/90 hover:text-foreground">
            Home
          </Link>
          <Link href="#features" className="animated-link text-foreground/90 hover:text-foreground">
            Features
          </Link>
          <Link href="#testimonials" className="animated-link text-foreground/90 hover:text-foreground">
            Testimonials
          </Link>
          <Link href="#contact" className="animated-link text-foreground/90 hover:text-foreground">
            Contact
          </Link>

          <ThemeToggle />
          
          <Link
            href="/auth/signin"
            className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Login
          </Link>
          <Link
            href="/auth/signup"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            Get Started
          </Link>
        </nav>

        <div className="flex items-center space-x-4 md:hidden">
          <ThemeToggle />
          <button
            onClick={toggleMobileMenu}
            className="p-2 text-foreground"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass glass-dark animate-slide-down">
          <nav className="container mx-auto py-4 flex flex-col space-y-4">
            <Link
              href="#home"
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#features"
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="px-4 py-2 hover:bg-muted rounded-md"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            <Link
              href="/auth/signin"
              className="mx-4 inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow transition-colors hover:bg-accent/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/auth/signup"
              className="mx-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
