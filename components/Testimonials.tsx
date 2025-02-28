
"use client"

import { useEffect, useRef, useState } from "react";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
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

  const testimonials = [
    {
      quote:
        "This system completely transformed how we manage our university hostel. The interface is intuitive and the features are incredibly well-thought-out. Our administrative workload has been reduced by 40%.",
      author: "Sarah Johnson",
      role: "Hostel Administrator, Oxford University",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "As a warden managing over 500 students, I needed a solution that was both powerful and easy to use. HostelHaven delivered beyond expectations with its room booking and complaint management features.",
      author: "Michael Chen",
      role: "Head Warden, Stanford Residences",
      imageUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
    {
      quote:
        "The digital notice board feature has improved our communication efficiency tenfold. Students are now always informed about important events and deadlines, reducing confusion and missed announcements.",
      author: "Emily Rodriguez",
      role: "Student Affairs Director, Cambridge Halls",
      imageUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&q=80",
    },
  ];

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div ref={sectionRef} className="container mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div
            className={`inline-block mb-4 px-3 py-1 text-sm font-medium text-foreground/80 rounded-full glass glass-dark transition-all duration-500 ease-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Success Stories
          </div>

          <h2
            className={`text-3xl md:text-4xl font-bold font-serif mb-4 tracking-tight heading-gradient transition-all duration-500 delay-100 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Trusted by Hostel Administrators Worldwide
          </h2>

          <p
            className={`text-lg text-foreground/80 max-w-2xl mx-auto transition-all duration-500 delay-200 ease-out ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Hear from the people who have transformed their hostel management experience with our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              role={testimonial.role}
              imageUrl={testimonial.imageUrl}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
