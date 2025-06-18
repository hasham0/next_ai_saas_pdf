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
type UploadFileResponseTS<TServerOutput> = {
  name: string;
  size: number;
  key: string;
  url: string;
  customId: string | null;
  serverData: TServerOutput;
};

type PDFSummaryTS = {
  userId?: string;
  original_file_url: string;
  summary_text: object;
  title: string;
  file_name: string;
};

type parseSummaryTS = {
  title: string;
  content: string[];
};

export type {
  StepTS,
  PlanTS,
  UploadFileResponseTS,
  PDFSummaryTS,
  parseSummaryTS,
};
