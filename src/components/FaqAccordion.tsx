import { useIsMobile } from "@/hooks/use-mobile";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

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
      "TidyMail simplifies the unsubscribe process with our one-click solution. When you choose to unsubscribe, our system handles the entire process securely in the background, so you don't have to visit multiple websites or fill out forms. The service complies with email marketing standards to ensure your preferences are properly registered with senders.",
  },
  {
    question: "Is there a limit to how many emails I can manage?",
    answer:
      "Our free plan allows you to manage up to 1,000 emails and 50 subscriptions. Premium plans offer unlimited email management.",
  },
  {
    question: "Can I recover deleted emails?",
    answer:
      "Emails moved to trash can be recovered within your email provider's trash retention period. Permanently deleted emails cannot be recovered.",
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
