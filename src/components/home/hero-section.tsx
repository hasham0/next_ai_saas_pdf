import Link from "next/link";
import { ArrowRight, Sparkle } from "lucide-react";
import {
  MotionDiv,
  MotionH1,
  MotionH2,
  MotionSection,
  MotionSpan,
} from "@/components/shared/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  buttonVariants,
  containerVariants,
  itemVariants,
} from "@/lib/constant";

const HeroSection = () => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="animate-in relative z-0 container mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-16 transition-all sm:py-20 lg:px-12 lg:py-20"
    >
      <MotionDiv
        variants={itemVariants}
        className="animate-gradient-x group relative overflow-hidden rounded-full border border-rose-400 bg-gradient-to-r from-rose-200 via-rose-500 to-rose-800 p-[1px]"
      >
        <Badge
          variant="secondary"
          className="relative rounded-full bg-white px-6 py-2 text-xl font-medium transition-colors duration-200 group-hover:bg-rose-200 hover:text-white"
        >
          <Sparkle
            size={24}
            className="mr-2 h-6 w-6 animate-pulse text-rose-600"
          />
          <p className="text-base text-rose-600">Powered by AI</p>
        </Badge>
      </MotionDiv>

      <MotionH1 variants={itemVariants} className="py-6 text-center font-bold">
        Transform PDFs into
        <span className="relative inline-block">
          <span className="relative z-10 px-2"> Concise </span>
          <span
            className="absolute inset-0 -rotate-2 -skew-y-1 transform rounded-lg bg-rose-200/50"
            aria-hidden="true"
          ></span>
        </span>
        Summaries
      </MotionH1>
      <MotionH2 className="px-4 text-center text-lg text-gray-600 sm:text-xl lg:max-w-4xl lg:px-0 lg:text-2xl">
        Get a beautiful summary of your document in seconds
      </MotionH2>
      <MotionDiv
        variants={itemVariants}
        whileHover={buttonVariants}
        className="mt-8"
      >
        <Button
          variant={"link"}
          className="mt-6 rounded-full bg-linear-to-r from-slate-900 to-rose-500 px-4 py-4 text-base font-bold text-white hover:from-rose-900 hover:to-slate-900 hover:no-underline sm:px-7 sm:py-7 lg:mt-16 lg:px-12 lg:py-10 lg:text-xl"
        >
          <Link className="flex items-center gap-2" href="/#pricing">
            <MotionSpan whileHover={buttonVariants}>Try Sommaire</MotionSpan>
            <ArrowRight size={24} className="animate-pulse" />
          </Link>
        </Button>
      </MotionDiv>
    </MotionSection>
  );
};

export default HeroSection;
