'use server';
import Stripe from 'stripe';

interface Address {
  city: string;
  country: string;
  line1: string;
  line2: string;
  postal_code: string;
}
interface Shipping {
  address: Address;
  name: string;
  carrier: string;
  phone: string;
}

export async function createStripeIntent(
  amount: number,
  currency: string = 'usd',
  metadata: Record<string, string> = {},
  shipping: Shipping,
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
    shipping,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
  };
}
