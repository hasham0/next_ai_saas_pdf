import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import BgGradient from "@/components/shared/bg-gradient";
import { Button } from "@/components/ui/button";

type Props = {};

const UpgradeRequired = ({}: Props) => {
  return (
    <div className="relative min-h-[50vh]">
      <BgGradient className="via bg-rose-50 from-rose-100 to-white" />
      <div className="container px-8 py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-2 text-rose-500">
            <Sparkle className="h-6 w-6 animate-pulse" />
            <span className="text-sm font-medium tracking-wider uppercase">
              Premium Feature
            </span>
          </div>
          <h1 className="xl:text-8xl0 bg-linear-to-r from-gray-400 to-rose-500 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl">
            Subscription Required
          </h1>
          <p className="max-w-xl rounded-lg border-2 border-dashed border-rose-200 bg-white/50 p-10 text-lg leading-0 text-gray-600 backdrop-blur-xs">
            You need to upgrade to a premium plan to access this feature.
          </p>
          <Button
            asChild
            className="text-md flex items-center justify-center gap-2 rounded-lg border-2 bg-linear-to-r from-rose-800 to-rose-500 py-2 text-white hover:scale-105 hover:from-rose-500 hover:to-rose-800"
          >
            <Link href={"/#pricing"} className="flex items-center gap-2">
              <span>View Pricing Plans</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpgradeRequired;
