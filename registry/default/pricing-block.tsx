import { SinglePricingCard, type PricingPlan } from "./single-pricing-card"

type PricingBlockProps = {
  plans: readonly PricingPlan[]
  className?: string
}

function PricingBlock({ plans, className = "" }: PricingBlockProps) {
  return (
    <div
      className={`grid items-stretch gap-4 ${plans.length > 1 ? "md:grid-cols-2" : "max-w-md"} ${plans.length > 2 ? "lg:grid-cols-3" : ""} ${className}`}
    >
      {plans.map((plan) => (
        <SinglePricingCard key={plan.name} {...plan} />
      ))}
    </div>
  )
}

export { PricingBlock }
export type { PricingBlockProps }
