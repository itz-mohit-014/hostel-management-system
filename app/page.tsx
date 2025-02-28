import Layout from "@/components/layouts/Layout";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";


export default function Home() {
  return (
    <Layout>
      <Hero />
      <Features />
      <Testimonials />
      <FAQ />
      <ContactForm />
    </Layout>  
  );
}
