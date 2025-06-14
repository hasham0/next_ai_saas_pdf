import { MoveRight } from "lucide-react";
import StepItem from "@/components/home/step-item";
import { steps } from "@/lib/constant";

type Props = {};

const HowItWorksSection = ({}: Props) => {
  return (
    <section className="relative overflow-hidden bg-gray-200/70">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-30 sm:left-[calc(40%-30rem)] sm:w-[40.1875rem]"
          />
        </div>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-xl font-bold text-rose-500 uppercase">
            How it works
          </h2>
          <h3 className="mx-auto max-w-2xl text-3xl font-bold">
            Transform any PDF into an easy-to-digest summary in three simple
            steps
          </h3>
        </div>
        <div className="relative mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-stretch">
              <StepItem step={step} />
              {index !== steps.length - 1 && (
                <div className="absolute top-1/2 -right-4 z-10 hidden -translate-y-1/2 transform md:block">
                  <MoveRight
                    size={32}
                    strokeWidth={1}
                    className="text-rose-400"
                  ></MoveRight>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
