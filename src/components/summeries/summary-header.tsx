import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { formatFileName } from "@/utils/formats";

type Props = {
  original_file_name: string;
  title: string;
  createdAt: Date;
};

const SummaryHeader = ({ original_file_name, title, createdAt }: Props) => {
  return (
    <div className="flex items-start gap-2 sm:gap-4">
      <FileText className="mt-1 h-6 w-6 text-rose-400 sm:h-8 sm:w-8" />
      <div className="min-w-0 flex-1">
        <h3 className="w-4/5 truncate text-base font-semibold text-gray-900 xl:text-lg">
          {title || formatFileName(original_file_name)}
        </h3>
        <p className="text-sm text-gray-600">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
};

export default SummaryHeader;
