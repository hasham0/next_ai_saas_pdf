import React from "react";
import { redirect } from "next/navigation";
import { Crown } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import { Badge } from "@/components/ui/badge";
import { pricingPlans } from "@/lib/constant";
import { getPriceIdForActiveUser } from "@/lib/user";
import { cn } from "@/lib/utils";

type Props = {};

const PlanBadge = async ({}: Props) => {
  const user = await currentUser();
  if (!user) {
    redirect("/sign-in");
  }

  let priceId: string | null = null;
  const email = user.emailAddresses[0]?.emailAddress;
  if (email) {
    priceId = await getPriceIdForActiveUser(email);
  }

  let planName = "Buy a Plan";
  const plan = pricingPlans.find((plan) => plan.priceId === priceId);
  if (plan) {
    planName = plan.name;
  }
  return (
    <Badge
      variant={"outline"}
      className={cn(
        "ml-2 hidden flex-row items-center border-amber-300 bg-linear-to-r from-amber-100 to-amber-200 lg:flex",
        !priceId && "fromred-100 border-red-300 to-red-200"
      )}
    >
      <Crown
        className={cn("mr-1 h-3 w-3 text-amber-600", !priceId && "bg-red-200")}
      />
      {planName}
    </Badge>
  );
};

export default PlanBadge;
