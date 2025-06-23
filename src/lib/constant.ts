import { BrainCircuit, FileOutput, FileText } from "lucide-react";
import { isDev } from "@/lib/helpers";
import { PlanTS, StepTS } from "@/types";

const steps: StepTS[] = [
  {
    Icon: FileText,
    label: "Upload PDF",
    description: "Simply drag and drop your PDF document or click to upload",
  },
  {
    Icon: BrainCircuit,
    label: "AI Analysis",
    description:
      "Our advanced AI technology analyzes your PDF and generates a summary",
  },
  {
    Icon: FileOutput,
    label: "Get Summary",
    description: "Recieve a concise summary of your PDF in seconds",
  },
];

const pricingPlans: PlanTS[] = [
  {
    id: "basic",
    name: "Basic",
    price: 9,
    description: "Get started with our basic plan",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_14AeVe4iw1ufb4OdCubII00"
      : "",
    priceId: isDev ? "price_1RcVn9IDNMCXjIharY0DwW35" : "",
    items: [
      "5 PDF summaries per month",
      "Standard processing",
      "Email Support",
      "Get Summary",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 19,
    description: "Unlock the power of our pro plan",
    paymentLink: isDev
      ? "https://buy.stripe.com/test_fZu6oI4iw7SD7SCgOGbII01"
      : "",
    priceId: isDev ? "price_1RcVn9IDNMCXjIhabykBq7FH" : "",
    items: [
      "Unlimited PDF summaries",
      "Priority processing",
      "24/7 support",
      "Markdown Export",
      "Get Summary",
    ],
  },
];

export { steps, pricingPlans };
