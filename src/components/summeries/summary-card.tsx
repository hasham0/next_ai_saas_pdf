import Link from "next/link";
import { MotionDiv } from "@/components/shared/motion-wrapper";
import DeleteButton from "@/components/summeries/delete-button";
import SummaryHeader from "@/components/summeries/summary-header";
import SummaryStatusBadge from "@/components/summeries/summary-status-badge";
import { Card } from "@/components/ui/card";
import { itemVariants } from "@/lib/constant";
import { formatSummaryText } from "@/utils/formats";

type Props = {
  summary: { [key: string]: string }; // Adjust type as per your summary structure
};

const SummaryCard = ({ summary }: Props) => {
  return (
    <MotionDiv
      variants={itemVariants}
      initial="hidden"
      animate={"visible"}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2, ease: "easeOut" },
      }}
    >
      <Card className="relative h-full">
        <div className="absolute top-2 right-2">
          <DeleteButton summaryId={summary.id} />
        </div>
        <Link href={`/summaries/${summary.id}`} className="block p-4 sm:p-6">
          <div className="flex flex-col gap-3 sm:gap-4">
            <SummaryHeader
              original_file_name={summary.file_name}
              title={summary.title}
              createdAt={summary.created_at}
            />
            <p className="line-clamp-2 pl-2 text-sm text-gray-600 sm:text-base">
              {formatSummaryText(summary.summary_text)}
            </p>
            <div className="mt-2 flex items-center justify-between sm:mt-4">
              <SummaryStatusBadge status={summary.status} />
            </div>
          </div>
        </Link>
      </Card>
    </MotionDiv>
  );
};

export default SummaryCard;
