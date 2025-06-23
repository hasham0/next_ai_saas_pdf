import Stripe from "stripe";
import getDBConnection from "@/lib/db";

const handleSubscriptionDeleted = async ({
  subscriptionId,
  stripe,
}: {
  subscriptionId: string;
  stripe: Stripe;
}) => {
  try {
    const sql = await getDBConnection();
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await sql`UPDATE users SET status = 'cancelled' WHERE customer_id = ${subscription.customer};`;
  } catch (error) {
    console.error("🚀 ~ error:", error);
    throw error;
  }
};

export { handleSubscriptionDeleted };
