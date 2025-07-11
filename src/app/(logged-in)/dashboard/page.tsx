import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, Plus } from "lucide-react";
import { currentUser } from "@clerk/nextjs/server";
import BgGradient from "@/components/shared/bg-gradient";
import {
  MotionDiv,
  MotionH1,
  MotionP,
} from "@/components/shared/motion-wrapper";
import EmptySummaryState from "@/components/summeries/empty-summary-state";
import SummaryCard from "@/components/summeries/summary-card";
import { Button } from "@/components/ui/button";
import { itemVariants } from "@/lib/constant";
import { getSummaries } from "@/lib/summaries";
import { hasReachedUploadLimit } from "@/lib/user";

type Props = {};

export default async function DashboardPage({}: Props) {
  const user = await currentUser();
  if (!user?.id) return redirect("/sign-in");
  const summeries = await getSummaries(user.id);
  const { hasReachedLimit } = await hasReachedUploadLimit(user.id);

  return (
    <main className="min-h-screen">
      <BgGradient className="from-emerald-200 via-teal-200 to-cyan-200" />
      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="px-28 py-12"
      >
        <div className="mb-8 flex flex-col items-center justify-around gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2">
            <MotionH1
              variants={itemVariants}
              initial="hidden"
              animate={"visible"}
              className="text-4xl font-bold"
            >
              Your Summeries
            </MotionH1>
            <MotionP
              variants={itemVariants}
              initial="hidden"
              animate={"visible"}
              className="py-1 font-medium text-gray-500"
            >
              Transform PDFs into Concise Summaries
            </MotionP>
          </div>
          {!hasReachedLimit && (
            <MotionDiv
              variants={itemVariants}
              initial="hidden"
              animate={"visible"}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="flex items-center"
            >
              <Button
                variant={"link"}
                className="group bg-linear-to-r from-slate-900 to-rose-500 text-white no-underline transition-all duration-300 hover:scale-105 hover:from-rose-500 hover:to-slate-900 hover:text-white"
              >
                <Link href={"/upload"} className="flex items-center text-white">
                  <Plus className="mr-2 h-5 w-5" />
                  New Summary
                </Link>
              </Button>
            </MotionDiv>
          )}
        </div>

        {hasReachedLimit && (
          <MotionDiv
            variants={itemVariants}
            initial="hidden"
            animate={"visible"}
            whileHover={{ scale: 1.05 }}
            className="my-10"
          >
            <div className="mx-auto flex max-w-5xl items-center justify-center rounded-lg border border-rose-400 bg-rose-50 p-4">
              <p className="text-sm">
                You have reached the limit of 5 uploads of basic plan
                <Link
                  className="mx-1 inline-flex items-center gap-0 font-medium text-rose-800 underline underline-offset-4"
                  href={"/#pricing"}
                >
                  <span>
                    Click to Upgrade to Pro
                    <ArrowRight className="inline-block h-4 w-4" />
                  </span>
                </Link>
                for unlimited uploads
              </p>
            </div>
          </MotionDiv>
        )}
        {summeries.length === 0 ? (
          <EmptySummaryState />
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 sm:gap-6 sm:px-0 md:grid-cols-2 lg:grid-cols-3">
            {summeries.map((summary, index) => (
              <SummaryCard key={index} summary={summary} />
            ))}
          </div>
        )}
      </MotionDiv>
    </main>
  );
}
