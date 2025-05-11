"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HeroSection from "@/components/home/hero-section";
import StatsSection from "@/components/home/stats-section";
import FeaturesSection from "@/components/home/features-section";
import HowItWorksSection from "@/components/home/how-it-works-section";
import TestimonialsSection from "@/components/home/testimonials-section";
import CTASection from "@/components/home/cta-section";
import FaqSection from "@/components/home/faq-section";
import AboutSection from "@/components/home/about-section";
import PricingSection from "@/components/home/pricing-section";
import ContactSection from "@/components/home/contact-section";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <AboutSection />
        <PricingSection />
        <CTASection />
        <ContactSection />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}
