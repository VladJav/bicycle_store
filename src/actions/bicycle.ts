'use server';

import prisma from '@src/lib/prisma';
import { Review, Bicycle } from '@generated/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImageToS3 } from '@src/lib/aws/bucketActions';

interface BicycleWithReviews extends Bicycle {
  reviews: Review[];
  rating: string;
}

interface CreateBicycleData
  extends Omit<Bicycle, 'id' | 'createdAt' | 'updatedAt'> {
  images: File[];
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

export async function getAllBicycles(params: any) {
  const bicycles = await prisma.bicycle.findMany(params);
  return bicycles;
}

export async function createBicycle(data: CreateBicycleData) {
  const images = await Promise.all(
    data.images.map(async (image) => {
      const { url } = await uploadImageToS3(image);
      return url;
    })
  );
  const bicycle = await prisma.bicycle.create({ data: { ...data, images } });
  revalidatePath('/dashboard');
  return bicycle;
}
