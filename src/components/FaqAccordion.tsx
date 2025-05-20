import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// FAQ data
const faqs = [
  {
    question: "Is TidyMail secure?",
    answer:
      "Yes, security is our top priority. We use industry-standard encryption and never store your email passwords. We only access the data necessary to provide our services.",
  },
  {
    question: "Which email providers are supported?",
    answer:
      "TidyMail currently supports Gmail. We're constantly adding support for more providers.",
  },
  {
    question: "Can I use TidyMail on mobile?",
    answer:
      "Yes, TidyMail is fully responsive and works on all devices, including smartphones and tablets. We're also working on dedicated mobile apps.",
  },
  {
    question: "How does unsubscribing work?",
    answer:
      "TidyMail simplifies the unsubscribe process with a one-click solution. When you choose to unsubscribe, our system securely handles the entire process in the background—no need to visit multiple websites or fill out forms. Once unsubscribed, you'll stop receiving unwanted emails, helping you keep your inbox clean and clutter-free.",
  },
  {
    question: "Is there a limit to how many emails I can manage?",
    answer:
      "Yes, limits depend on your plan. The Free plan allows you to trash up to 500 emails, permanently delete up to 300 emails, and unsubscribe from 5 subscriptions per month. The Pro plan increases those limits to 8,000 trashed emails, 5,000 permanent deletes, and 500 unsubscriptions per month. The Business plan offers unlimited trash, permanent deletes, and unsubscriptions.",
  },
  {
    question: "How do I contact support?",
    answer:
      "You can contact our support team through the form in the 'Contact' section of our website, or by emailing us directly at support@tidymail.email. We aim to respond within 24 hours.",
  },
  {
    question: "Can I cancel my subscription?",
    answer:
      "Yes, you can cancel your subscription anytime through your Dashboard’s billing section. Your subscription will remain active until the end of your current billing cycle.",
  },
  {
    question: "Can I recover deleted emails?",
    answer:
      "Emails moved to trash can be recovered within your email provider’s trash retention period. However, permanently deleted emails cannot be recovered.",
  },
];

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger className="text-left text-lg font-semibold">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="mt-2 text-base text-muted-foreground">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
