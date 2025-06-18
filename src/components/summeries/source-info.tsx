import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import DownloadSummaryButton from "@/components/summeries/download-summary-button";
import { Button } from "@/components/ui/button";

type Props = {
  fileName: string;
  originalFileUrl: string;
  title: string;
  summeryText: string;
  createdAt: Date;
};

const SourceInfo = ({
  fileName,
  createdAt,
  originalFileUrl,
  summeryText,
  title,
}: Props) => {
  return (
    <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-sm lg:flex-row">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-rose-400" />
          <span>Source:{fileName}</span>
        </div>
        <Button
          variant={"link"}
          size={"sm"}
          className="h-8 border border-rose-200 bg-rose-100 px-3 text-rose-600 hover:bg-rose-200 hover:text-rose-700"
        >
          <Link href={originalFileUrl} className="flex gap-2" target="_blank">
            <ExternalLink className="h-2 w-2" />
            <span>View Original</span>
          </Link>
        </Button>
        <DownloadSummaryButton
          createdAt={createdAt}
          fileName={fileName}
          summaryText={summeryText}
          title={title}
        />
      </div>
    </div>
  );
};

export default SourceInfo;
