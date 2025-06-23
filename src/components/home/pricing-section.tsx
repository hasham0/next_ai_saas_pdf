import PricngCard from "@/components/home/pricing-card";
import { pricingPlans } from "@/lib/constant";

type Props = {};

const PricingSection = ({}: Props) => {
  return (
    <section className="relative overflow-hidden" id="pricing">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 lg:pt-12">
        <div className="flex w-full items-center justify-center pb-12">
          <h2 className="mb-8 text-xl font-bold text-rose-800 uppercase">
            Pricing
          </h2>
        </div>
        <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricngCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
