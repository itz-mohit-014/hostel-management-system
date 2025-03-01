
import { useState } from "react";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin
} from "lucide-react";


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
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center mb-4">
              <h1 className="text-xl font-serif font-semibold">
                <span className="heading-gradient">Hostel</span>
                <span className="text-primary dark:text-primary">Haven</span>
              </h1>
            </Link>
            <p className="text-foreground/80 mb-4">
            A comprehensive hostel management system designed to streamline administrative processes and enhance student experiences.
            </p>
            <div className="flex space-x-4">
              <Link href={"#"} className="h-8 w-8 rounded-full hover:bg-black/15 hover:dark:bg-white/15 dark:bg-white/5 flex items-center justify-center transition-all">
                <Facebook size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={"#"} className="h-8 w-8 rounded-full hover:bg-black/15 hover:dark:bg-white/15 dark:bg-white/5 flex items-center justify-center transition-all">
                <Twitter size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={"#"} className="h-8 w-8 rounded-full hover:bg-black/15 hover:dark:bg-white/15 dark:bg-white/5 flex items-center justify-center transition-all">
                <Instagram size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Link>
              <Link href={"#"} className="h-8 w-8 rounded-full hover:bg-black/15 hover:dark:bg-white/15 dark:bg-white/5 flex items-center justify-center transition-all">
                <Linkedin size={16} className="text-muted-foreground hover:text-primary transition-colors" />
              </Link>
            </div>
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

        <div className="border-t border-border mt-10 pt-4 text-center">
          <p className="text-muted-foreground text-sm">
            &copy; {new Date().getFullYear()} HostelHaven. All rights reserved.
          </p>
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
