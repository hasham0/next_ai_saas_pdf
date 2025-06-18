import { cn } from "@/lib/utils";

type Props = {
  status: string;
};

const SummaryStatusBadge = ({ status }: Props) => {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-medium capitalize",
        status === "completed"
          ? "bg-green-100 text-green-800"
          : "bg-yellow-100 text-shadow-yellow-800"
      )}
    >
      {status}
    </span>
  );
};

export default SummaryStatusBadge;
