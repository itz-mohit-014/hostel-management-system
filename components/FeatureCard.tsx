"use client"

import { LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  color?: string;
}

const FeatureCard = ({ 
  icon: Icon, 
  title, 
  description, 
  delay = 0,
  color = "primary" 
}: FeatureCardProps) => {

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  const gradientClasses = {
    primary: "from-primary/10 to-transparent",
    secondary: "from-secondary/20 to-transparent",
    accent: "from-accent/20 to-transparent",
    info: "from-blue-500/10 to-transparent",
  };

  const gradientClass = gradientClasses[color as keyof typeof gradientClasses] || gradientClasses.primary;

  return (
    <div
      ref={cardRef}
      className={`group relative rounded-xl p-8 transition-all duration-500 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <div 
        className={`absolute inset-0 bg-gradient-to-br ${gradientClass} rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0`}
      />
      

      <div 
        className={`absolute inset-0 rounded-xl border border-border/30 group-hover:border-primary/50 dark:group-hover:border-primary/40 transition-colors duration-500 z-0 ${
          isHovered ? 'shadow-lg shadow-primary/5 dark:shadow-primary/10' : ''
        }`}
      />
      
      <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-primary/70 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-125"></div>
      
      <div className="relative z-10 mb-6">
        <div className={`relative w-14 h-14 rounded-lg flex items-center justify-center bg-gradient-to-br from-background via-background to-background/80 border border-border/30 transition-all duration-300 group-hover:scale-110 overflow-hidden`}>
          <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
          <Icon
            className={`w-7 h-7 text-primary transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
            strokeWidth={1.5}
          />
        </div>
      </div>
      
      <div className="relative z-10">
        <h3 className="text-xl font-medium font-serif mb-3 transition-colors group-hover:text-foreground/90">
          {title}
        </h3>
        <p className="text-foreground/70 leading-relaxed transition-colors duration-300 group-hover:text-foreground/80">
          {description}
        </p>
      </div>
      

      <div className={`absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 ${isHovered ? 'translate-y-0' : 'translate-y-4'}`}>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-primary"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5l7 7-7 7"></path>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default FeatureCard;
