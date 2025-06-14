import { StepTS } from "@/types";

type Props = {
  step: StepTS;
};

const StepItem = ({ step: { Icon, label, description } }: Props) => {
  return (
    <div className="group relative w-full rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xs transition-colors duration-200 hover:border-rose-500/50">
      <div className="flex h-full flex-col gap-4">
        <div className="to mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-linear-to-br from-rose-500/10 to-transparent transition-colors group-hover:from-rose-500/20">
          <div className="text-rose-500">
            <Icon size={64} strokeWidth={1.5} />
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-between gap-1">
          <h4 className="text-center text-xl font-bold">{label}</h4>
          <p className="text-center text-sm text-gray-600">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepItem;
