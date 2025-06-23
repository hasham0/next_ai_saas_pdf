import { NeonQueryFunction } from "@neondatabase/serverless";
import Stripe from "stripe";
import getDBConnection from "@/lib/db";

const createOrUpdateUser = async ({
  sql,
  email,
  fullname,
  customer_id,
  price_id,
  status,
}: {
  sql: NeonQueryFunction<false, false>;
  email: string;
  fullname: string;
  customer_id: string;
  price_id: string;
  status: "active" | "cancelled";
}) => {
  try {
    const user = await sql`SELECT * FROM users WHERE email = ${email};`;
    if (!user || user.length === 0) {
      await sql`INSERT INTO users (email, full_name, customer_id, price_id, status) VALUES (${email}, ${fullname}, ${customer_id}, ${price_id}, ${status});`;
    } else {
      await sql`UPDATE users SET full_name = ${fullname}, customer_id = ${customer_id}, price_id = ${price_id}, status = ${status} WHERE email = ${email};`;
    }
  } catch (error) {
    console.error("🚀 ~ error:", error);
    throw error;
  }
};

const createPayment = async ({
  sql,
  session,
  userEmail,
  priceId,
}: {
  sql: NeonQueryFunction<false, false>;
  session: Stripe.Response<Stripe.Checkout.Session>;
  userEmail: string;
  priceId: string;
}) => {
  try {
    const { amount_total, status, id } = session;
    await sql`INSERT INTO payments (amount, status, stripe_payment_id,price_id,user_email) VALUES (${amount_total}, ${status}, ${id}, ${priceId}, ${userEmail});`;
  } catch (error) {
    console.error("🚀 ~ error:", error);
    throw error;
  }
};

const handleCheckoutSessionCompleted = async ({
  session,
  stripe,
}: {
  session: Stripe.Response<Stripe.Checkout.Session>;
  stripe: Stripe;
}) => {
  try {
    const sql = await getDBConnection();
    const customerId = session.customer as string;
    const customer = await stripe.customers.retrieve(customerId);
    const priceId = session.line_items?.data[0]?.price?.id;
    if ("email" in customer && priceId) {
      const { name, email } = customer;
      await createOrUpdateUser({
        sql,
        email: email as string,
        fullname: name as string,
        customer_id: customerId,
        price_id: priceId as string,
        status: "active",
      });
      await createPayment({
        sql,
        session,
        userEmail: email as string,
        priceId: priceId as string,
      });
    }
  } catch (error) {
    console.error("🚀 ~ error:", error);
    throw error;
  }
};

export { handleCheckoutSessionCompleted };
