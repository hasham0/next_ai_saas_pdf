import Link from "next/link";
import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

type Props = {};

const EmptySummaryState = ({}: Props) => {
  return (
    <div className="mx-auto max-w-4xl py-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 px-3 md:flex-row md:items-end">
          <FileText className="h-12 w-12 text-gray-400 sm:h-16 sm:w-16" />
          <h2 className="text-lg font-semibold sm:text-3xl">
            No Summaries Yet
          </h2>
        </div>
        <p className="max-w-md text-gray-500">
          Upload a PDF to get started with our AI-powered PDF summarizer
        </p>
        <Link href={"/upload"}>
          <Button className="group bg-linear-to-r from-slate-900 to-rose-500 text-white capitalize no-underline transition-all duration-300 hover:scale-105 hover:from-rose-500 hover:to-slate-900 hover:text-white">
            create your first summary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptySummaryState;
