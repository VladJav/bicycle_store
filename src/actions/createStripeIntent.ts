'use server';
import Stripe from 'stripe';

export async function createStripeIntent(
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string> = {}
) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-03-31.basil',
  });

  if (!amount || amount <= 0) {
    throw new Error('Invalid amount');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    metadata,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
  };
}
