'use server';

import prisma from '@src/lib/prisma';
import { Review, Bicycle, Prisma, User } from '@generated/prisma';
import { revalidatePath } from 'next/cache';
import { uploadImageToS3 } from '@src/lib/aws/bucketActions';
import { requireAdmin } from '@src/lib/authz';

type ReviewWithUser = Review & {
  user: User;
};

interface BicycleWithReviews extends Bicycle {
  reviews: Review[];
  rating: string;
}

interface BicycleWithUserReviews extends Omit<BicycleWithReviews, 'reviews'> {
  reviews: ReviewWithUser[];
}

interface CreateBicycleData
  extends Omit<Bicycle, 'id' | 'createdAt' | 'updatedAt' | 'images'> {
  images: File[];
}

interface UpdateBicycleData
  extends Omit<Bicycle, 'id' | 'createdAt' | 'updatedAt' | 'images'> {
  images: (File | string)[];
}

interface Params {
  where?: Prisma.BicycleWhereInput;
  orderBy?: Prisma.BicycleOrderByWithRelationInput;
  skip?: number;
  take?: number;
  include?: Prisma.BicycleInclude;
}

export async function getBicycle(id: string): Promise<BicycleWithUserReviews> {
  const bicycle = await prisma.bicycle.findUniqueOrThrow({
    where: { id },
    include: {
      reviews: {
        include: {
          user: true,
        },
      },
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

export async function getAllBicycles(params: Params): Promise<Array<BicycleWithReviews>> {
  const bicycles = await prisma.bicycle.findMany({
    ...params,
    include: {
      ...params.include,
      reviews: true,
    },
  });

  return bicycles.map((bicycle) => {
    const rating =
      bicycle.reviews.reduce((acc, review) => acc + review.rating, 0) /
      bicycle.reviews.length;

    return {
      ...bicycle,
      rating: Number.isNaN(rating) ? '0.00' : rating.toFixed(2),
    };
  });
}

export async function getBicyclesCount(params: Prisma.BicycleCountArgs) {
  const count = await prisma.bicycle.count(params);
  return count;
}

export async function getAllBicyclesColors() {
  const bicycles = await prisma.bicycle.findMany({
    select: {
      colors: true,
    },
  });

  const allColors = bicycles.flatMap((bicycle) => bicycle.colors);
  return [...new Set(allColors)];
}

export async function createBicycle(data: CreateBicycleData) {
  await requireAdmin();

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

export async function deleteBicycle(id: string) {
  await requireAdmin();

  await prisma.bicycle.delete({
    where: { id }
  });
  revalidatePath('/dashboard');
}

export async function updateBicycle(id: string, data: UpdateBicycleData) {
  await requireAdmin();

  const existingImages = data.images.filter(
    (image) => typeof image === 'string'
  );
  const uploadedImages = await Promise.all(
    data.images
      .filter((image) => typeof image !== 'string')
      .map(async (image) => {
        const { url } = await uploadImageToS3(image);
        return url;
      })
  );

  const bicycle = await prisma.bicycle.update({
    where: { id },
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      images: [...existingImages, ...uploadedImages],
      features: data.features,
      colors: data.colors,
    },
  });
  revalidatePath('/dashboard');
  return bicycle;
}
