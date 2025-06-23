import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { handleCheckoutSessionCompleted } from "@/lib/payments";
import { handleSubscriptionDeleted } from "@/lib/subscription";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(request: NextRequest) {
  const payload = await request.text();

  const signature = request.headers.get("Stripe-Signature");
  if (!signature) {
    throw new Error("Missing Stripe Signature");
  }

  const endPointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!endPointSecret) {
    throw new Error("Missing Stripe Webhook Secret");
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, endPointSecret);
    switch (event.type) {
      case "checkout.session.completed":
        const sessionId = event.data.object.id;
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
          expand: ["line_items"],
        });
        await handleCheckoutSessionCompleted({ session, stripe });
        break;
      case "customer.subscription.deleted":
        const subscriptionId = event.data.object.id;
        await handleSubscriptionDeleted({
          subscriptionId,
          stripe,
        });
        break;
      default:
        console.log("🚀 ~ POST ~ events:", event);
        break;
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "failed to trigger webhook",
        error,
      },
      { status: 400 }
    );
  }

  return NextResponse.json(
    {
      message: "working",
    },
    { status: 200 }
  );
}
