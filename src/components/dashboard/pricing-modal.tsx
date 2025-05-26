"use client";
import { useState, useEffect } from "react";
import { CheckCircle, Loader, Loader2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { sendEnterpriseRequest, useCheckout } from "@/services/email-service";
import { useMutation } from "@tanstack/react-query";
import { symbols } from "@/lib/constants";

interface ExchangeRates {
  [key: string]: number
}

interface LocationData {
  country: string
  currency: string
}

interface PricingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PricingModal({
  open,
  onOpenChange,
}: PricingModalProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [activeTab, setActiveTab] = useState("plans");
  const [userCurrency, setUserCurrency] = useState("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [isLoadingCurrency, setIsLoadingCurrency] = useState(true);
  const [locationData, setLocationData] = useState<LocationData | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    employees: "",
    message: "",
  });

  // Get user's location then convert => currency
  useEffect(() => {
    const detectCurrencyFromIP = async () => {
      try {
        // Fallback: use IP-based location detection
        const response = await fetch("https://ipapi.co/json/")
        const data = await response.json()
        const currency = data.currency || "USD"

        setLocationData({
          country: data.country_name || "Unknown",
          currency: currency,
        })
        setUserCurrency(currency)
      } catch (error) {
        console.error("Error detecting currency from IP:", error)
        setUserCurrency("USD")
      } finally {
        setIsLoadingCurrency(false)
      }
    }

    detectCurrencyFromIP()
  }, [])

  // Fetch exchange rates Then convert usd to User's X coin
  useEffect(() => {
    const fetchExchangeRates = async () => {
      if (userCurrency === "USD") {
        setExchangeRates({ USD: 1 })
        return
      }

      try {
        // freeware api i found that even works without api keys
        // price updates every 24h
        const response = await fetch("https://open.er-api.com/v6/latest/USD")
        const data = await response.json()

        if (data.rates) {
          setExchangeRates(data.rates)
        }
      } catch (error) {
        console.error("Error fetching exchange rates:", error)
        toast.error("Failed to load currency rates", {
          description: "Prices will be shown in USD",
        })
        setUserCurrency("USD")
        setExchangeRates({ USD: 1 })
      }
    }

    if (userCurrency && !isLoadingCurrency) {
      fetchExchangeRates()
    }
  }, [userCurrency, isLoadingCurrency]);

  // Convert USD to user currency
  const convertPrice = (usdPrice: number): string => {
    if (userCurrency === "USD" || !exchangeRates[userCurrency]) {
      return usdPrice.toFixed(2)
    }

    const convertedPrice = usdPrice * exchangeRates[userCurrency]

    // Format based on currency
    if (["JPY", "KRW", "VND", "IDR"].includes(userCurrency)) {
      return Math.round(convertedPrice).toString()
    }

    return convertedPrice.toFixed(2)
  };

  // Get currency symbol
  const getCurrencySymbol = (currency: string): string => {
    return symbols[currency] || currency + " ";
  };

  const useSendEnterpriseRequest = () => {
    return useMutation({
      mutationFn: sendEnterpriseRequest,
      onSuccess: () => {
        toast.success("Request Submitted", {
          description: "Our sales team will contact you shortly.",
        });
        setActiveTab("plans");
        console.log("Enterprise request sent successfully");
      },
      onError: (error) => {
        toast.error("Something went wrong", {
          description: `${error}Please try again later.`,
        });
        console.error("Enterprise request error:", error);
      },
    });
  };

  const enterpriseMutation = useSendEnterpriseRequest();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEnterpriseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      enterpriseMutation.mutate(formData);
    } catch (error) {
      toast.error("Something went wrong", {
        description: `${error}Please try again later.`,
      });
    } finally {
      setFormData({
        name: "",
        email: "",
        company: "",
        employees: "",
        message: "",
      });
    }
  };

  const checkoutMutation = useCheckout();

  const handleCheckout = (plan_key: string[]) => {
    checkoutMutation.mutate(plan_key);
  };

  const currencySymbol = getCurrencySymbol(userCurrency);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-6 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-3xl text-center font-bold">
            Pricing Plans
          </DialogTitle>
          <DialogDescription className="text-center text-lg">
            Choose the plan that&apos;s right for you.
            {/* Show Country name + Currency name using api data */}
            {locationData && !isLoadingCurrency && (
              <div className="flex items-center justify-center mt-4 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>
                  Prices shown in {userCurrency} for {locationData.country}
                </span>
              </div>
            )}
          </DialogDescription>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full mt-4"
        >
          <TabsList className="grid grid-cols-2 w-full mb-8">
            <TabsTrigger value="plans" className="text-base">
              Pricing Plans
            </TabsTrigger>
            <TabsTrigger value="enterprise" className="text-base">
              Enterprise
            </TabsTrigger>
          </TabsList>

          <TabsContent value="plans" className="mt-0">
            <div className="flex items-center justify-center mb-8">
              <Label
                htmlFor="billing-toggle"
                className={`mr-2 text-lg ${
                  !isYearly
                    ? "font-medium"
                    : "text-muted-foreground cursor-pointer"
                }`}
              >
                Monthly
              </Label>
              <Switch
                id="billing-toggle"
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <Label
                htmlFor="billing-toggle"
                className={`ml-2 text-lg ${
                  isYearly
                    ? "font-medium"
                    : "text-muted-foreground cursor-pointer"
                }`}
              >
                Yearly{" "}
                <Badge className="ml-1 bg-primary/20 text-primary hover:bg-primary/30">
                  Save 28%
                </Badge>
              </Label>
            </div>

            <div className="grid grid-col-1 md:grid-cols-2 gap-6">
              {/* Pro Plan */}
              <Card className="border-primary shadow-lg flex flex-col relative">
                <div className="absolute -top-4 inset-x-0 flex justify-center">
                  <Badge className="bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Pro</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Perfect for personal use
                  </p>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                    {isLoadingCurrency ? (
                      <div className="animate-pulse bg-gray-200 h-12 w-32 rounded"></div>
                    ) : (
                      <>
                        {currencySymbol}
                        {convertPrice(isYearly ? 5.03 : 6.99)}
                        <span className="ml-1 text-lg font-medium text-muted-foreground">
                          /month
                        </span>
                      </>
                    )}
                  </div>
                  {isYearly && !isLoadingCurrency && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Billed annually ({currencySymbol}
                      {convertPrice(5.03 * 12)}/year)
                    </p>
                  )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>10 Full analysis of subscriptions per month</span>
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
                  <Button
                    className="w-full"
                    onClick={() =>
                      handleCheckout(["pro_yearly", "pro_monthly"])
                    }
                    disabled={checkoutMutation.isPending}
                  >
                    {checkoutMutation.isPending && (
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Get Started
                  </Button>
                </CardFooter>
              </Card>

              {/* Business Plan */}
              <Card className="border shadow-md flex flex-col">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl">Business</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Perfect for teams and businesses
                  </p>
                  <div className="mt-4 flex items-baseline text-4xl font-extrabold">
                {isLoadingCurrency ? (
                  <div className="animate-pulse bg-gray-200 h-12 w-32 rounded"></div>
                ) : (
                  <>
                    {currencySymbol}
                    {convertPrice(isYearly ? 6.47 : 8.99)}
                    <span className="ml-1 text-lg font-medium text-muted-foreground">
                      /month
                    </span>
                  </>
                )}
              </div>
              {isYearly && !isLoadingCurrency && (
                <p className="text-sm text-muted-foreground mt-2">
                  Billed annually ({currencySymbol}
                  {convertPrice(6.47 * 12)}/year)
                </p>
              )}
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>30 subscription analysis/month</span>
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
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() =>
                      handleCheckout(["business_yearly", "business_monthly"])
                    }
                    disabled={checkoutMutation.isPending}
                  >
                    {checkoutMutation.isPending && (
                      <Loader className="h-4 w-4 animate-spin mr-2" />
                    )}
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground mb-4">
                Need a custom solution for your organization?
              </p>
              <Button
                variant="outline"
                onClick={() => setActiveTab("enterprise")}
              >
                Contact Sales
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="enterprise" className="mt-0">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold">Enterprise Solutions</h3>
              <p className="text-muted-foreground mt-2">
                We offer tailored enterprise plans with dedicated support,
                custom integrations, and advanced security features.
              </p>
            </div>

            <form onSubmit={handleEnterpriseSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base">
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
                  <Label htmlFor="email" className="text-base">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-base">
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
                    type="number"
                    value={formData.employees}
                    onChange={handleInputChange}
                    required
                    className="h-11"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-base">
                  How can we help?
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="min-h-[150px]"
                />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={enterpriseMutation.isPending}
                >
                  {enterpriseMutation.isPending ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    "Submit Request"
                  )}
                </Button>
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
