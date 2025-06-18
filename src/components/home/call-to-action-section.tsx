import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const CTASection = ({}: Props) => {
  return (
    <section className="bg-gray-100">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Ready to Save Hours of Reading Time?
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-gray-500 lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              Transform lengthy documents into clear, actionable insignths with
              our AI-powered PDF summarizer
            </p>
          </div>
          <div className="flex flex-col justify-center gap-2 min-[400px]:flex-row">
            <div>
              <Button
                size={"lg"}
                variant={"link"}
                className="w-full bg-linear-to-r from-slate-900 to-rose-500 text-white transition-all duration-300 hover:from-rose-500 hover:to-slate-900 hover:text-white min-[400px]:w-auto"
              >
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
