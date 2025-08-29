import { NextResponse } from "next/server"
import { stripe } from "../_lib/stripe"

export async function POST(req: Request) {
  try {
    // Stripe requires the raw body to construct the event
    const buf = await req.arrayBuffer()
    const body = Buffer.from(buf)
    const sig = req.headers.get("stripe-signature") || ""
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || ""
    let event
    try {
      event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
    } catch (err: any) {
      console.error("Webhook signature verification failed.", err)
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 })
    }
    // Handle different event types
    switch (event.type) {
      case "customer.subscription.created":
        // TODO: update subscriptions table accordingly
        break
      case "customer.subscription.updated":
        break
      case "customer.subscription.deleted":
        break
      default:
        console.log(`Unhandled event type ${event.type}`)
    }
    return NextResponse.json({ received: true })
  } catch (error: any) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}
