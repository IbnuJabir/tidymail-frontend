"use client";
import { CheckCircle, X } from "lucide-react";
import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Subscribe } from "../../../server/polar";

export default function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnterpriseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    try {
      // In a real implementation, you would send this data to your backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Request Submitted", {
        description: "Our sales team will contact you shortly.",
      });

      setIsModalOpen(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        employees: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description: `${error}Please try again later.`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that&apos;s right for you.
          </p>

          <div className="flex items-center justify-center mt-8">
            <Label
              htmlFor="billing-toggle"
              className={`mr-2 text-xl ${
                !isYearly ? "font-medium" : "text-muted-foreground cursor-pointer"
              }`}
            >
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
              className="text-9xlxl"
            />
            <Label
              htmlFor="billing-toggle"
              className={`ml-2 text-xl ${
                isYearly ? "font-medium" : "text-muted-foreground cursor-pointer"
              }`}
            >
              Yearly{" "}
              <Badge className="ml-1 bg-primary/20 text-primary hover:bg-primary/30">
                Save 28%
              </Badge>
            </Label>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border shadow-md flex flex-col">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Free</CardTitle>
              <CardDescription>Perfect for getting started</CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                $0
                <span className="ml-1 text-xl font-medium text-muted-foreground">
                  /month
                </span>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Full analysis of subscriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Advanced sorting and search</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unsubscribe from 5 subscriptions/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Trash up to 500 emails/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Permanently delete 300 emails/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    Re-subscribe capability
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <X className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">Bulk actions</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-primary shadow-lg flex flex-col relative">
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <Badge className="bg-primary text-primary-foreground">
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Pro</CardTitle>
              <CardDescription>Perfect for personal use</CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                ${isYearly ? "4.99" : "6.99"}
                <span className="ml-1 text-xl font-medium text-muted-foreground">
                  /month
                </span>
              </div>
              {isYearly && (
                <p className="text-sm text-muted-foreground mt-2">
                  Billed annually (${4.99 * 12}/year)
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Full analysis of subscriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Advanced sorting and search</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unsubscribe from 500 subscriptions/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Trash up to 8,000 emails/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Permanently delete 5,000 emails/month</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Re-subscribe from unsubscribed subscriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Bulk row trash & delete</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              {/* <Link href="/login" className="w-full">
              </Link> */}
                <Button className="w-full" onClick={()=>Subscribe()}>Get Started</Button>
            </CardFooter>
          </Card>

          {/* Business Plan */}
          <Card className="border shadow-md flex flex-col">
            <CardHeader className="pb-8">
              <CardTitle className="text-xl">Business</CardTitle>
              <CardDescription>
                Perfect for teams and businesses
              </CardDescription>
              <div className="mt-4 flex items-baseline text-5xl font-extrabold">
                ${isYearly ? "14.99" : "19.99"}
                <span className="ml-1 text-xl font-medium text-muted-foreground">
                 /month
                </span>
              </div>
              {isYearly && (
                <p className="text-sm text-muted-foreground mt-2">
                  Billed annually (${14.99 * 12}/year)
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unlimited subscription analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Advanced sorting and search</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unlimited unsubscribes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unlimited email trash</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Unlimited permanent deletes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Re-subscribe capability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Advanced bulk actions & automation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Priority support</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/login" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-16 mx-auto max-w-3xl text-center">
          <h3 className="text-xl font-bold mb-4">Enterprise Solutions</h3>
          <p className="text-muted-foreground mb-8">
            Need a custom solution for your organization? We offer tailored
            enterprise plans with dedicated support, custom integrations, and
            advanced security features.
          </p>
          <Button
            variant="outline"
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            Contact Sales
          </Button>
        </div>
      </div>

      {/* Enterprise Contact Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[700px] p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Contact Our Sales Team
            </DialogTitle>
            <DialogDescription className="text-base md:mt-2">
              Fill out the form below and our enterprise team will get back to
              you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEnterpriseSubmit} className="md:space-y-6 mt-2 md:mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="md:text-base">
                  Full Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="md:text-base">
                  Work Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 mt-3">
              <div className="space-y-2">
                <Label htmlFor="company" className="md:text-base">
                  Company Name
                </Label>
                <Input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees" className="text-base">
                  Number of Employees
                </Label>
                <Input
                  id="employees"
                  name="employees"
                  value={formData.employees}
                  onChange={handleInputChange}
                  required
                  className="h-11"
                />
              </div>
            </div>
            <div className="space-y-2 mt-3">
              <Label htmlFor="message" className="md:text-base">
                How can we help?
              </Label>
              <Textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="min-h-[70px] md:min-h-[150px] text-base"
              />
            </div>
            <DialogFooter className="mt-2 md:mt-8">
              <Button
                type="submit"
                className="w-full h-12 text-base"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </div>
                ) : (
                  "Submit Request"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </section>
  );
}
