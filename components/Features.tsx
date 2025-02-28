
"use client"

import { Bed, Users, MessageSquare, Bell } from "lucide-react";
import FeatureCard from "./FeatureCard";
import { useEffect, useState, useRef } from "react";

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      icon: Bed,
      title: "Room Booking",
      description:
        "Streamline the room allocation process with our intuitive booking system. Manage availability, reservations, and check-ins/check-outs with ease.",
      color: "primary"
    },
    {
      icon: Users,
      title: "Student Management",
      description:
        "Keep comprehensive records of all residents including personal details, emergency contacts, fee payments, and attendance tracking.",
      color: "secondary" 
    },
    {
      icon: MessageSquare,
      title: "Complaints Handling",
      description:
        "Efficiently track and resolve student issues with our streamlined complaint management system. Ensure no concern goes unaddressed.",
      color: "accent"
    },
    {
      icon: Bell,
      title: "Notice Board",
      description:
        "Broadcast important announcements, events, and updates to all residents instantly through digital notice boards and notifications.",
      color: "info"
    },
  ];

  return (
    <section id="features" className="py-20 bg-accent/20 dark:bg-accent/10 relative overflow-hidden">
      <div 
        className="absolute inset-0 -z-10 bg-background opacity-50 dark:opacity-80"
        aria-hidden="true"
      />
      
      <div className="absolute -z-10 top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-secondary/5 blur-3xl"></div>
      </div>
      
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div 
            className={`inline-block mb-4 px-3 py-1 text-sm font-medium text-foreground/80 rounded-full glass glass-dark transition-all duration-500 ease-out hover:scale-105 cursor-default ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Powerful Features
          </div>
          
          <h2 
            className={`text-3xl md:text-4xl font-bold font-serif mb-4 tracking-tight heading-gradient transition-all duration-500 delay-100 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Everything You Need to Manage Your Hostel
          </h2>
          
          <p 
            className={`text-lg text-foreground/80 max-w-2xl mx-auto transition-all duration-500 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Our comprehensive solution combines all essential tools in one elegant platform, designed specifically for modern hostel management.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 100}
              color={feature.color as string}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
