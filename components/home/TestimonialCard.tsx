"use client"

import { useEffect, useRef, useState } from "react";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  imageUrl: string;
  delay?: number;
}

const TestimonialCard = ({
  quote,
  author,
  role,
  imageUrl,
  delay = 0,
}: TestimonialCardProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`glass glass-dark rounded-xl p-6 shadow-sm hover-lift border border-border/50 transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-6">
          <svg
            className="h-8 w-8 text-primary/60"
            fill="currentColor"
            viewBox="0 0 32 32"
            aria-hidden="true"
          >
            <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
          </svg>
        </div>
        <p className="flex-1 text-foreground/90 mb-6 italic leading-relaxed">"{quote}"</p>
        <div className="flex items-center">
          <img
            src={imageUrl}
            alt={author}
            className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-border/30"
          />
          <div>
            <p className="font-semibold">{author}</p>
            <p className="text-sm text-foreground/70">{role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
