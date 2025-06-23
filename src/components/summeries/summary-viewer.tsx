"use client";

import { useState } from "react";
import { MotionDiv } from "@/components/shared/motion-wrapper";
import ContentSection from "@/components/summeries/content-section";
import NavigationControls from "@/components/summeries/navigation-controls";
import ProgressBar from "@/components/summeries/progress-bar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { parseSummaryTS } from "@/types";
import { parseSection } from "@/utils/summary-helper";

type Props = {
  summary: string;
};

const SummeryViewer = ({ summary }: Props) => {
  const [currentSection, setCurrentSection] = useState<number>(0);

  const sections: Array<parseSummaryTS> = parseSection(summary);

  const handleNextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((pre) => Math.min(pre + 1, sections.length - 1));
    }
  };

  const handlePreviousSection = () => {
    if (currentSection > 0) {
      setCurrentSection((pre) => Math.max(pre - 1, 0));
    }
  };

  return (
    <Card className="from-backgroud via-background backrop-blur-lg relative h-[500px] w-full overflow-hidden rounded-3xl border border-rose-500/10 bg-linear-to-r to-rose-500/5 px-2 shadow-2xl sm:h-[600px] lg:h-[700px]">
      <ProgressBar section={sections} currentSection={currentSection} />
      <MotionDiv
        key={currentSection}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        exit={{ opacity: 0 }}
        className="scrollbar-hide h-full overflow-y-auto pt-12 pb-20 sm:px-6 sm:pt-16"
      >
        <div className="px-4 sm:px-6">
          <CardHeader>
            <div className="bg-background/80 sticky top-0 z-10 mb-6 flex flex-col gap-2 pt-2 pb-4 backdrop-blur">
              <h2 className="justify-center gap-2 text-center text-3xl font-bold tracking-tight sm:text-4xl">
                {sections[currentSection].title}
              </h2>
            </div>
          </CardHeader>
        </div>

        <CardContent>
          <ContentSection content={sections[currentSection].content} />
        </CardContent>
      </MotionDiv>
      <NavigationControls
        currentSection={currentSection}
        totalSections={sections.length}
        onPreviousSection={handlePreviousSection}
        onNextSection={handleNextSection}
        onSelectSection={setCurrentSection}
      />
    </Card>
  );
};

export default SummeryViewer;
