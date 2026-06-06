import 'server-only';

import { shippingOptions } from '@src/constants/core';
import prisma from '@src/lib/prisma';

export interface CheckoutCartItemInput {
  id: string;
  color: string;
  quantity: number;
}

export async function calculateCheckout(
  items: CheckoutCartItemInput[],
  shippingOptionId: string
) {
  const normalizedItems = items
    .map((item) => ({
      id: item.id,
      color: item.color,
      quantity: Math.floor(Number(item.quantity)),
    }))
    .filter((item) => item.id && item.color && item.quantity > 0);

  if (normalizedItems.length === 0) {
    throw new Error('Cart is empty');
  }

  const bicycles = await prisma.bicycle.findMany({
    where: {
      id: {
        in: [...new Set(normalizedItems.map((item) => item.id))],
      },
    },
  });
  const bicycleById = new Map(bicycles.map((bicycle) => [bicycle.id, bicycle]));

  const cartItems = normalizedItems.map((item) => {
    const bicycle = bicycleById.get(item.id);

    if (!bicycle) {
      throw new Error('Cart contains an unavailable bicycle');
    }

    if (!bicycle.colors.includes(item.color)) {
      throw new Error(`Color ${item.color} is unavailable for ${bicycle.title}`);
    }

    return {
      bicycleId: bicycle.id,
      title: bicycle.title,
      price: bicycle.price,
      quantity: item.quantity,
      color: item.color,
    };
  });

  const shippingOption =
    shippingOptions.find((option) => option.id === shippingOptionId) ??
    shippingOptions[0];
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shippingCost = shippingOption.price;
  const total = subtotal + shippingCost;

  return {
    cartItems,
    shippingOption,
    subtotal,
    shippingCost,
    total,
    amount: Math.round(total * 100),
  };
}
