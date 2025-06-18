"use client";

import { Dispatch, SetStateAction } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  currentSection: number;
  totalSections: number;
  onPreviousSection: () => void;
  onNextSection: () => void;
  onSelectSection: Dispatch<SetStateAction<number>>;
};

const NavigationControls = ({
  currentSection,
  totalSections,
  onPreviousSection,
  onNextSection,
  onSelectSection,
}: Props) => {
  return (
    <div className="bg-background/80 backdroup-blur-sm absolute right-0 bottom-0 left-0 border border-t border-rose-500/10 p-4">
      <div className="flex items-center justify-between">
        <Button
          size="icon"
          variant="outline"
          onClick={onPreviousSection}
          disabled={currentSection === 0}
          className={cn(
            "to h-12 w-12 rounded-full border border-rose-500/10 bg-rose-600 backdrop-blur-xs transition-all duration-200 hover:bg-rose-400 hover:text-white",
            currentSection === 0
              ? "pointer-events-none opacity-50"
              : "hover:bg-rose-400"
          )}
        >
          <ChevronLeft />
        </Button>
        <div className="space-x-3">
          {Array.from({ length: totalSections }, (_, index) => (
            <Button
              size={"sm"}
              key={index}
              className={cn(
                "h-3 w-3 rounded-full border border-rose-500/10 bg-rose-600 p-0 backdrop-blur-xs transition-all duration-200",
                currentSection === index
                  ? "pointer-events-none opacity-50"
                  : "hover:bg-rose-400"
              )}
              onClick={() => onSelectSection(index)}
            />
          ))}
        </div>
        <Button
          size="icon"
          variant="outline"
          disabled={currentSection === totalSections - 1}
          onClick={onNextSection}
          className={cn(
            "to h-12 w-12 rounded-full border border-rose-500/10 bg-rose-600 backdrop-blur-xs transition-all duration-200 hover:bg-rose-400 hover:text-white",
            currentSection === totalSections - 1 &&
              "pointer-events-none hover:bg-rose-400"
          )}
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default NavigationControls;
