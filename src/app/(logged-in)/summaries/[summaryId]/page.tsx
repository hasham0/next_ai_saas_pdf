import { notFound } from "next/navigation";
import { FileText } from "lucide-react";
import BgGradient from "@/components/shared/bg-gradient";
import { MotionDiv } from "@/components/shared/motion-wrapper";
import SelectedSummaryHeader from "@/components/summeries/selected-summary-header";
import SourceInfo from "@/components/summeries/source-info";
import SummeryViewer from "@/components/summeries/summary-viewer";
import { getSummaryById } from "@/lib/summaries";

type Props = {
  params: Promise<{ summaryId: string }>;
};

export default async function SummaryPage({ params }: Props) {
  const { summaryId } = await params;

  const summary = await getSummaryById(summaryId);
  if (!summary) {
    return notFound();
  }
  const {
    title,
    file_name,
    word_count,
    original_file_url,
    summary_text,
    created_at,
  } = summary[0];

  const readingTime = Math.ceil((word_count || 0) / 200);

  return (
    <div className="relative isolate min-h-screen bg-linear-to-b from-rose-50/40 to-white">
      <BgGradient className="from-rose-400 via-rose-300 to-orange-200" />
      <div className="container mx-auto flex flex-col gap-4">
        <div className="px-4 py-6 sm:px-6 sm:py-12 lg:px-8 lg:py-24">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col"
          >
            <SelectedSummaryHeader
              title={title}
              createdAt={created_at}
              readingTime={readingTime}
            />
            {file_name && (
              <SourceInfo
                fileName={file_name}
                createdAt={created_at}
                originalFileUrl={original_file_url}
                summeryText={summary_text}
                title={title}
              />
            )}
            <MotionDiv
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative mt-4 sm:mt-8 lg:mt-12"
            >
              <div className="relative rounded-2xl border border-rose-100/30 bg-white/80 p-4 shadow-xl backdrop-blur-md transition-all duration-300 hover:shadow-2xl sm:rounded-3xl sm:p-6 lg:p-8">
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-rose-50/50 via-orange-50/30 to-transparent opacity-50 sm:rounded-3xl" />
                <div className="absolute top-2 right-2 flex w-fit items-center gap-1.5 text-xs sm:top-4 sm:right-4 sm:gap-2 sm:text-sm">
                  <FileText className="h-4 w-4 text-rose-400 sm:h-5 sm:w-5" />
                  {word_count} words
                </div>
                <div className="relative mt-6 flex justify-center">
                  <SummeryViewer summary={summary_text} />
                </div>
              </div>
            </MotionDiv>
          </MotionDiv>
        </div>
      </div>
    </div>
  );
}
