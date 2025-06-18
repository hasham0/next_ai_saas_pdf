import Link from "next/link";
import { Calendar, ChevronLeft, Clock, Sparkle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = { title: string; createdAt: Date; readingTime: number };

const SelectedSummaryHeader = ({ title, createdAt, readingTime }: Props) => {
  return (
    <div className="mb-4 flex items-center justify-between gap-4">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center gap-4">
          <Badge
            variant={"secondary"}
            className="relative rounded-full border border-rose-200 bg-white px-6 py-2 text-base font-medium transition-colors group-hover:bg-gray-50"
          >
            <Sparkle className="mr-2 h-6 w-6 animate-pulse text-rose-600" />
            AI Summary
          </Badge>
          <Badge className="relative rounded-full border border-rose-200 bg-white px-6 py-2 text-base font-medium text-rose-400 transition-colors group-hover:bg-gray-50">
            <Calendar className="mr-2 h-6 w-6" />
            {new Date(createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Badge>
          <Badge className="relative rounded-full border border-rose-200 bg-white px-6 py-2 text-base font-medium text-rose-400 transition-colors group-hover:bg-gray-50">
            <Clock className="mr-2 h-6 w-6" />
            {readingTime} mints
          </Badge>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 capitalize sm:text-4xl lg:text-5xl xl:text-6xl">
          <span className="bg-gradient-to-r from-rose-700 via-rose-500 to-rose-800 bg-clip-text text-transparent">
            {title}
          </span>
        </h1>
      </div>
      <div>
        <Link href={"/dashboard"}>
          <Button
            variant={"link"}
            className="group flex items-center rounded-full text-white transition-all duration-300 hover:text-white hover:underline"
          >
            <span>
              <ChevronLeft />
            </span>
            <span>
              Back <span className="hidden md:inline">to Dashboard</span>
            </span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default SelectedSummaryHeader;
