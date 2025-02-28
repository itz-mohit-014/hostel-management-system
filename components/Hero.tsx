"use client";

import { useEffect, useState, useRef } from "react";
import { ChevronRight, Star, Circle, Square } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    if (heroRef.current) {
      heroRef.current.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      clearTimeout(timer);

      if (heroRef.current) {
        heroRef.current.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, []);

  const calculateTransform = (factor: number) => {
    if (!heroRef.current) return { x: 0, y: 0 };

    const centerX = heroRef.current.offsetWidth / 2;
    const centerY = heroRef.current.offsetHeight / 2;

    const deltaX = (mousePosition.x - centerX) / centerX;
    const deltaY = (mousePosition.y - centerY) / centerY;

    return {
      x: deltaX * factor,
      y: deltaY * factor,
    };
  };

  const decorElements = [
    {
      icon: Star,
      size: 16,
      color: "text-primary/70",
      x: 15,
      y: 20,
      factor: -15,
    },
    {
      icon: Circle,
      size: 24,
      color: "text-secondary",
      x: 80,
      y: 30,
      factor: 20,
    },
    {
      icon: Square,
      size: 20,
      color: "text-primary/60",
      x: 85,
      y: 70,
      factor: -25,
    },
    {
      icon: Star,
      size: 28,
      color: "text-secondary/80",
      x: 10,
      y: 75,
      factor: 18,
    },
    {
      icon: Circle,
      size: 14,
      color: "text-primary/50",
      x: 50,
      y: 10,
      factor: -22,
    },
    {
      icon: Square,
      size: 18,
      color: "text-secondary/70",
      x: 40,
      y: 80,
      factor: 15,
    },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden"
    >
      <div
        className="absolute inset-0 -z-10 h-full w-full bg-background bg-gradient-radial from-secondary/50 via-background to-background dark:from-secondary/10 dark:via-background dark:to-background"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="animate-spotlight absolute left-1/2 top-1/2 h-[40rem] w-[60rem] rounded-full bg-primary/5"
          style={{
            transform: `translate(-50%, -50%) translate(${
              mousePosition.x * 0.01
            }px, ${mousePosition.y * 0.01}px)`,
            transition: "transform 0.2s ease-out",
          }}
        />
      </div>

      {decorElements.map((elem, index) => {
        const Icon = elem.icon;
        const transform = calculateTransform(elem.factor);
        return (
          <div
            key={index}
            className={`absolute hidden md:block ${elem.color} opacity-0 transition-opacity duration-1000`}
            style={{
              left: `${elem.x}%`,
              top: `${elem.y}%`,
              transform: `translate(${transform.x}px, ${transform.y}px)`,
              opacity: isVisible ? 0.7 : 0,
              transition: "transform 0.3s ease-out, opacity 1s ease-out",
            }}
          >
            <Icon size={elem.size} strokeWidth={1.5} />
          </div>
        );
      })}

      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div
            className={`transition-all duration-1000 ease-out ${
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            }`}
          >
            <div
              className="inline-block mb-6 px-3 py-1 text-sm font-medium text-foreground/80 rounded-full glass glass-dark 
                           hover:scale-105 transition-all duration-300 cursor-default"
            >
              Simplify Hostel Management
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              Manage Your Hostel with
              <span className="block heading-gradient relative">
                Elegance & Efficiency
                <div
                  className="absolute -bottom-2 left-0 w-0 h-1 bg-primary opacity-70 transition-all duration-1000 ease-out"
                  style={{
                    width: isVisible ? "100%" : "0%",
                    transitionDelay: "0.5s",
                  }}
                ></div>
              </span>
            </h1>

            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
              A comprehensive solution that combines traditional hospitality
              values with modern technology to deliver an exceptional hostel
              management experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#features"
                className="group w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground shadow transition-all duration-300 hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:translate-y-[-4px]"
              >
                Explore Features
                <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                className="group w-full sm:w-auto inline-flex h-12 items-center justify-center rounded-md border border-input bg-background px-6 py-3 font-medium text-foreground shadow-sm transition-all duration-300 hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring hover:translate-y-[-4px]"
              >
                Request Demo
                <div className="ml-2 h-4 w-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </a>
            </div>
          </div>

          <div
            className={`mt-12 md:mt-16 w-full max-w-3xl mx-auto shadow-xl rounded-xl overflow-hidden transition-all duration-1000 delay-300 ease-out ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-16"
            }`}
            style={{
              transform: isVisible
                ? `perspective(1000px) rotateY(${
                    mousePosition.x * 0.005
                  }deg) rotateX(${-mousePosition.y * 0.005}deg)`
                : "perspective(1000px) rotateY(0) rotateX(0)",
              transition:
                "transform 0.3s ease-out, opacity 1s ease-out, translate 1s ease-out",
            }}
          >
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Hostel Management Dashboard"
              className="w-full h-auto object-cover rounded-xl border border-border/50 shadow-md"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
