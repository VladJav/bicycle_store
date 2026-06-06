'use server';
import Stripe from 'stripe';
import { requireUser } from '@src/lib/authz';
import { calculateCheckout, CheckoutCartItemInput } from '@src/lib/checkout';

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
  items: CheckoutCartItemInput[],
  shippingOption: string,
  shipping: Shipping,
  currency: string = 'usd',
) {
  const session = await requireUser();
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-03-31.basil',
  });
  const checkout = await calculateCheckout(items, shippingOption);

  if (!checkout.amount || checkout.amount <= 0) {
    throw new Error('Invalid amount');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: checkout.amount,
    currency,
    metadata: {
      userId: session.user.id,
      cartItems: JSON.stringify(checkout.cartItems),
      shippingOption: checkout.shippingOption.id,
      shippingCost: checkout.shippingCost.toFixed(2),
      subtotal: checkout.subtotal.toFixed(2),
      total: checkout.total.toFixed(2),
    },
    shipping,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  return {
    clientSecret: paymentIntent.client_secret,
    paymentIntentId: paymentIntent.id,
    total: checkout.total,
    subtotal: checkout.subtotal,
    shippingCost: checkout.shippingCost,
  };
}
