import BgGradient from "@/components/shared/bg-gradient";
import { MotionDiv, MotionH1 } from "@/components/shared/motion-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { itemVariants } from "@/lib/constant";

const HeaderSkeleton = () => {
  return (
    <div className="mb-8 flex flex-col items-center justify-around gap-4 md:flex-row">
      <div className="flex flex-col items-center gap-2">
        <MotionH1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold"
        >
          <Skeleton className="h-8 w-40 rounded-md" />
        </MotionH1>
        {/* Replaced MotionP with MotionDiv */}
        <MotionDiv
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="py-1 font-medium text-gray-500"
        >
          <Skeleton className="h-6 w-48 rounded-md" />
        </MotionDiv>
      </div>
      <MotionDiv
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="py-1 font-medium text-gray-500"
      >
        <Skeleton className="h-6 w-48 rounded-md" />
      </MotionDiv>
    </div>
  );
};

const SummaryCardSkeleton = () => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="bg-card text-card-foreground rounded-lg border shadow-sm"
    >
      <Skeleton className="h-48 w-full rounded-lg" />
    </MotionDiv>
  );
};

type Props = {};

export default function LoadingSummaries({}: Props) {
  return (
    <div className="relative min-h-screen">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <section className="container mx-auto px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-24">
        <HeaderSkeleton />
        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:px-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <SummaryCardSkeleton key={index} />
          ))}
        </div>
      </section>
    </div>
  );
}
