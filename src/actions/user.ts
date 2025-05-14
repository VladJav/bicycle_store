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
