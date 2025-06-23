import { pricingPlans } from "@/lib/constant";
import getDBConnection from "@/lib/db";
import { getUserUploadCount } from "@/lib/summaries";

const getPriceIdForActiveUser = async (email: string) => {
  const sql = await getDBConnection();
  const query = await sql`
    SELECT price_id FROM users WHERE email = ${email} AND status = 'active';`;
  return query.length > 0 ? query[0].price_id : null;
};

const hasActiveSubscriptionPlan = async (email: string) => {
  const sql = await getDBConnection();
  const query = await sql`
    SELECT price_id,status FROM users WHERE email = ${email} AND status = 'active' AND price_id IS NOT NULL;`;
  return query && query.length > 0;
};

const hasReachedUploadLimit = async (userId: string) => {
  const uploadCount: number = await getUserUploadCount(userId);
  const priceId = await getPriceIdForActiveUser(userId);
  const isPro =
    pricingPlans.find((plan) => plan.priceId === priceId)?.id === "pro";
  const uploadLimit = isPro ? 1000 : 5;
  return {
    hasReachedLimit: uploadCount >= uploadLimit,
    uploadLimit,
  };
};

export {
  getPriceIdForActiveUser,
  hasReachedUploadLimit,
  hasActiveSubscriptionPlan,
};
