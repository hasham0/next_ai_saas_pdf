import PricingCard from "@/components/home/pricing-card";
import { MotionDiv, MotionSection } from "@/components/shared/motion-wrapper";
import { containerVariants, itemVariants, pricingPlans } from "@/lib/constant";

type Props = {};

const PricingSection = ({}: Props) => {
  return (
    <MotionSection
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative overflow-hidden"
      id="pricing"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24 lg:pt-12">
        <MotionDiv
          variants={itemVariants}
          className="flex w-full items-center justify-center pb-12"
        >
          <h2 className="mb-8 text-xl font-bold text-rose-800 uppercase">
            Pricing
          </h2>
        </MotionDiv>
        <div className="relative flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-stretch">
          {pricingPlans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>
      </div>
    </MotionSection>
  );
};

export default PricingSection;
