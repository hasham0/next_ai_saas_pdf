import { FileText } from "lucide-react";
import BgGradient from "@/components/shared/bg-gradient";
import { Skeleton } from "@/components/ui/skeleton";
import LoadingSkeleton from "@/components/upload/loading-skeleton";
import { cn } from "@/lib/utils";

const HeaderSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-8 w-3/4 bg-white/80" />
      <Skeleton className="h-4 w-1/3 bg-white/80" />
    </div>
  );
};

const ContentSkeleton = () => {
  return (
    <div className="w-full space-y-4">
      {[...Array(8)].map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            "h-4",
            index % 3 === 0 ? "w-full" : index % 2 === 0 ? "w-11/12" : "w-9/12",
            "bg-white/80"
          )}
        />
      ))}
    </div>
  );
};

type Props = {};

export default function LoadingSummary({}: Props) {
  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-24">
          <div className="flex flex-col gap-8">
            <HeaderSkeleton />
            <div className="relative overflow-hidden">
              <div className="relative rounded-2xl border border-rose-100/30 bg-white/80 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 sm:rounded-3xl" />
                <div className="absolute top-2 right-2 flex w-fit items-center gap-1.5 text-xs sm:top-4 sm:right-4 sm:gap-2 sm:text-sm">
                  <FileText className="h-4 w-4 text-rose-400 sm:h-5 sm:w-5" />
                  <Skeleton className="h-4 w-16 bg-white/80" />
                </div>
                <div className="relative mt-6 flex justify-center">
                  <ContentSkeleton />
                </div>
                <div className="relative mt-6 flex justify-center">
                  <LoadingSkeleton />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
