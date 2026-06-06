'use server';
import prisma from '@src/lib/prisma';
import Stripe from 'stripe';
import { requireAdmin, requireUser } from '@src/lib/authz';
import { calculateCheckout, CheckoutCartItemInput } from '@src/lib/checkout';

interface CreateOrderParams {
  stripeIntentId: string;
}

export const createOrder = async (order: CreateOrderParams) => {
  const session = await requireUser();
  const existingOrder = await prisma.order.findFirst({
    where: {
      stripeIntentId: order.stripeIntentId,
      userId: session.user.id,
    },
  });

  if (existingOrder) {
    return existingOrder;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-03-31.basil',
  });
  const paymentIntent = await stripe.paymentIntents.retrieve(
    order.stripeIntentId
  );

  if (paymentIntent.status !== 'succeeded') {
    throw new Error('Payment has not succeeded');
  }

  if (paymentIntent.metadata.userId !== session.user.id) {
    throw new Error('Payment does not belong to the current user');
  }

  const cartItems = JSON.parse(
    paymentIntent.metadata.cartItems || '[]'
  ) as Array<CheckoutCartItemInput & { bicycleId?: string }>;
  const checkout = await calculateCheckout(
    cartItems.map((item) => ({
      id: item.id ?? item.bicycleId ?? '',
      color: item.color,
      quantity: item.quantity,
    })),
    paymentIntent.metadata.shippingOption
  );

  if (paymentIntent.amount !== checkout.amount) {
    throw new Error('Payment amount does not match the cart');
  }

  const shippingAddress = paymentIntent.shipping?.address;
  const address = [
    shippingAddress?.line1,
    shippingAddress?.line2,
    shippingAddress?.city,
    shippingAddress?.state,
    shippingAddress?.postal_code,
    shippingAddress?.country,
  ]
    .filter(Boolean)
    .join(', ');

  const createdOrder = await prisma.order.create({
    data: {
      stripeIntentId: order.stripeIntentId,
      address,
      shippingMethod: checkout.shippingOption.name,
      shippingCost: checkout.shippingCost,
      total: checkout.total,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      status: {
        connectOrCreate: {
          where: { title: 'On hold' },
          create: { title: 'On hold' },
        },
      },
      orderItems: {
        create: checkout.cartItems.map((item) => ({
          quantity: item.quantity,
          color: item.color,
          bicycle: {
            connect: {
              id: item.bicycleId,
            },
          },
        })),
      },
    },
  });

  return createdOrder;
};

export const getOrders = async (offset: number) => {
  await requireAdmin();

  const orders = await prisma.order.findMany({
    take: 5,
    skip: Math.max(0, offset - 5),
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      status: {
        select: {
          title: true,
        },
      },
      orderItems: {
        include: {
          bicycle: {
            select: {
              title: true,
              price: true,
              images: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.order.count();

  return { orders, total };
};

export const updateOrderStatus = async (orderId: string, statusTitle: string) => {
  await requireAdmin();

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: {
        connectOrCreate: {
          where: { title: statusTitle },
          create: { title: statusTitle },
        },
      },
    },
  });
};
