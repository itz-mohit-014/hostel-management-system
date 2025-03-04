"use client"

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Info } from "lucide-react";

const FAQ = () => {
  const [openItem, setOpenItem] = useState<string | null>("item-0");

  const faqItems = [
    {
      question: "How does the room booking system work?",
      answer: "Our room booking system allows students to view available rooms, check amenities, and book directly through our platform. Administrators can manage bookings, set room availability, and handle payment processing all in one place."
    },
    {
      question: "What student management features are available?",
      answer: "Our student management system includes profile management, attendance tracking, fee payment history, academic records, and communication tools. It provides a comprehensive overview of each student's information for efficient administration."
    },
    {
      question: "How can students report complaints or maintenance issues?",
      answer: "Students can submit complaints or maintenance requests through the dedicated portal. Each request is assigned a ticket number for tracking, and students receive updates as their issue progresses through resolution stages."
    },
    {
      question: "How do I access important notices and announcements?",
      answer: "All notices and announcements are posted on the central dashboard, categorized by urgency and relevance. Users can also opt for email or SMS notifications for critical updates to ensure nothing important is missed."
    },
    {
      question: "Is the system accessible on mobile devices?",
      answer: "Yes, our hostel management system is fully responsive and works seamlessly across desktops, tablets, and mobile phones, allowing students and administrators to access it from anywhere at any time."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-secondary/50 dark:bg-muted/10">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 dark:bg-primary/20">
            <Info className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold text-center font-serif mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-center text-muted-foreground max-w-2xl">
            Find answers to the most common questions about our hostel management system
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion
            type="single"
            collapsible
            value={openItem as string}
            onValueChange={(value) => setOpenItem(value)}
            className="space-y-4"
          >
            {faqItems.map((item, index) => (
              <AccordionItem
                key={`item-${index}`}
                value={`item-${index}`}
                className="border border-border rounded-lg overflow-hidden bg-card animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-all">
                  <span className="text-left font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pt-2 pb-4 text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
