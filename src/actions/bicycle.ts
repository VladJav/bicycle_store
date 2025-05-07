'use server';

import prisma from '@src/lib/prisma';
import { Review, Bicycle } from '@generated/prisma';

interface BicycleWithReviews extends Bicycle {
  reviews: Review[];
  rating: string;
}

export async function getBicycle(id: string): Promise<BicycleWithReviews> {
  const bicycle = await prisma.bicycle.findUniqueOrThrow({
    where: { id },
    include: {
      reviews: true,
    },
  });
  const rating =
    bicycle.reviews.reduce((acc, review) => acc + review.rating, 0) /
    bicycle.reviews.length;
  return {
    ...bicycle,
    rating: Number.isNaN(rating) ? '0.00' : rating.toFixed(2),
  };
}
