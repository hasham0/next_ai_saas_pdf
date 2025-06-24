import { MotionDiv } from "@/components/shared/motion-wrapper";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { containerVariants, itemVariants } from "@/lib/constant";

const LoadingSkeleton = () => {
  return (
    <Card className="from-background via-background relative h-[500px] w-full overflow-hidden rounded-3xl border border-rose-500/10 bg-gradient-to-r to-rose-500/5 px-2 shadow-2xl backdrop-blur-lg sm:h-[600px] lg:h-[700px]">
      <MotionDiv
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="scrollbar-hide h-full overflow-y-auto pt-12 pb-20 sm:px-6 sm:pt-16"
      >
        <div className="px-4 sm:px-6">
          <CardHeader>
            <div className="bg-background/80 sticky top-0 z-10 mb-6 flex flex-col gap-2 pt-2 pb-4 backdrop-blur">
              <Skeleton className="mx-auto h-8 w-64 sm:h-10 sm:w-72" />
            </div>
          </CardHeader>
        </div>

        <CardContent>
          <MotionDiv
            variants={containerVariants}
            className="mx-auto space-y-4 px-4 py-4 sm:px-6"
          >
            {[...Array(4)].map((_, i) => (
              <MotionDiv
                key={`skeleton-${i}`}
                variants={itemVariants}
                className="group relative rounded-2xl border border-gray-100/10 bg-gray-300/10 p-4"
              >
                <div className="absolute inset-0 rounded-2xl border border-gray-100/10 bg-gray-300/10 p-4" />
                <div className="relative flex items-start gap-3">
                  <Skeleton className="h-6 w-6 rounded-full" />
                  <div className="w-full space-y-2">
                    <Skeleton className="h-4 w-4/5" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </div>
              </MotionDiv>
            ))}
          </MotionDiv>
        </CardContent>
      </MotionDiv>

      <div className="bg-background/80 absolute right-0 bottom-0 left-0 border-t border-rose-500/10 p-4 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex space-x-3">
            {[...Array(4)].map((_, i) => (
              <Skeleton
                key={i}
                className="h-3 w-3 rounded-full bg-rose-600/20"
              />
            ))}
          </div>
          <Skeleton className="h-12 w-12 rounded-full" />
        </div>
      </div>
    </Card>
  );
};

export default LoadingSkeleton;
