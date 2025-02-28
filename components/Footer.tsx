
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setShowScrollTop(window.scrollY > 500);
    });
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
              <h1 className="text-xl font-serif font-semibold">
                <span className="heading-gradient">Hostel</span>
                <span className="text-primary dark:text-primary">Haven</span>
              </h1>
            </Link>
            <p className="text-foreground/80 mb-4">
              Transforming hostel management with elegant technology solutions.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                  Room Booking
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                  Student Management
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                  Complaints Handling
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-foreground/80 hover:text-foreground transition-colors">
                  Notice Board
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-foreground/80 hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 font-serif">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-foreground/70 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} HostelHaven. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Twitter
            </Link>
            <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Facebook
            </Link>
            <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">
              Instagram
            </Link>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-lg transition-all duration-300 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring hover-scale ${
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Scroll to top"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </footer>
  );
};

export default Footer;
