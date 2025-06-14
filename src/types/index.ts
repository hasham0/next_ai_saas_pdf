import { LucideIcon } from "lucide-react";

type StepTS = {
  Icon: LucideIcon;
  label: string;
  description: string;
};
type PlanTS = {
  id: "basic" | "pro" | "enterprise";
  name: "Basic" | "Pro" | "Enterprise";
  price: number;
  description: string;
  paymentLink: string;
  priceId: string;
  items: string[];
};

export type { StepTS, PlanTS };
