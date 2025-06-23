import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import UpgradeRequired from "@/components/shared/upgrade-required";
import { hasActiveSubscriptionPlan } from "@/lib/user";

export const metadata: Metadata = {
  title: "Dashboard - AI-powered PDF Summarizer",
  description:
    "Manage your summaries, uploads, and account settings with ease.",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await currentUser();
  if (!user || !user.id) {
    redirect("/sign-in");
  }
  const hasActiveSubscription = await hasActiveSubscriptionPlan(
    user.emailAddresses[0].emailAddress
  );

  if (!hasActiveSubscription) {
    return <UpgradeRequired />;
  }
  return <>{children}</>;
}
