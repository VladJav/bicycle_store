'use server';

import { auth } from '@src/lib/auth';
import prisma from '@src/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Review } from '@generated/prisma';

export async function createReview(review: Review) {
  const session = await auth();
  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }
  const creview = await prisma.review.create({
    data: {
      title: review.title,
      comment: review.comment,
      rating: review.rating,
      helpful: 0,
      user: {
        connect: {
          id: session.user.id,
        },
      },
      bicycle: {
        connect: {
          id: review.bicycleId,
        },
      },
    },
  });
  revalidatePath(`/product/${review.bicycleId}`);
  return creview;
}
