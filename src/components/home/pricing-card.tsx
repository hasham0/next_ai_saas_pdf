import Link from "next/link";
import { ArrowRight, CheckIcon } from "lucide-react";
import { Variants } from "motion/react";
import { MotionDiv } from "@/components/shared/motion-wrapper";
import { cn } from "@/lib/utils";
import { PlanTS } from "@/types";

type Props = {
  plan: PlanTS;
};

const listVariants: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", damping: 10, stiffness: 100 },
  },
};
const PricingCard = ({
  plan: { id, name, price, description, paymentLink, items },
}: Props) => {
  return (
    <MotionDiv
      variants={listVariants}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-full max-w-lg duration-300 hover:scale-105 hover:transition-all"
    >
      <MotionDiv
        variants={listVariants}
        className={cn(
          "relative flex h-full flex-col gap-4 rounded-2xl border-[1px] border-gray-500/20 bg-white/5 p-16 backdrop-blur-xs lg:gap-8",
          id === "pro" && "gap-5 border-2 border-rose-500"
        )}
      >
        <MotionDiv
          variants={listVariants}
          className="flex items-center justify-between gap-4"
        >
          <div>
            <p className="text-lg font-bold capitalize lg:text-xl">{name}</p>
            <p className="text-base-content/80 mt-2">{description}</p>
          </div>
        </MotionDiv>
        <MotionDiv variants={listVariants} className="flex gap-2">
          <p className="text-5xl font-extrabold tracking-tight">${price}</p>
          <div className="mb-[4px] flex flex-col justify-end">
            <p className="text-xs font-semibold uppercase">USD</p>
            <p className="text-xs">/month</p>
          </div>
        </MotionDiv>
        <MotionDiv
          variants={listVariants}
          className="flex-1 space-y-2.5 text-base leading-relaxed"
        >
          {items.map((item, index) => (
            <ol className="flex items-center gap-2" key={index}>
              <CheckIcon size={18} />
              <li>{item}</li>
            </ol>
          ))}
        </MotionDiv>
        <MotionDiv
          variants={listVariants}
          className="flex w-full justify-center space-y-2"
        >
          <Link
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-full border-2 bg-linear-to-r from-rose-800 to-rose-500 py-2 text-white hover:from-rose-500 hover:to-rose-800",
              id === "pro"
                ? "bg-rose-800"
                : "border-rose-100 from-rose-400 to-rose-500"
            )}
            href={paymentLink}
            target="_blank"
          >
            <span>Buy Now</span>
            <ArrowRight size={18} />
          </Link>
        </MotionDiv>
      </MotionDiv>
    </MotionDiv>
  );
};

export default PricingCard;
