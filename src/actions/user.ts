'use server';

import prisma from '@src/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function deleteUser(id: string) {
  await prisma.user.delete({
    where: {
      id,
    },
  });
  revalidatePath('/dashboard/customers');
}

export async function getUsers(offset: number) {
  const users = await prisma.user.findMany({
    take: 5,
    skip: offset - 5,
    orderBy: {
      createdAt: 'desc'
    },
  });

  const total = await prisma.user.count();

  return {
    users,
    total
  };
}

export async function updateProfile(id: string, data: { 
  name?: string; 
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}) {
  await prisma.user.update({
    where: {
      id,
    },
    data,
  });
  revalidatePath('/profile');
  revalidatePath('/settings');
}
