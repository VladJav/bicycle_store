'use server';
import prisma from '@src/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function getStatuses(params: { skip?: number, take?: number }) {
  const statuses = await prisma.status.findMany(params);

  const total = await prisma.status.count();

  return {
    statuses,
    total
  };
}

export async function createStatus(title: string) {
  const status = await prisma.status.create({
    data: {
      title
    }
  });
  
  revalidatePath('/dashboard/statuses');
  return status;
}

export async function updateStatus(id: string, title: string) {
  const status = await prisma.status.update({
    where: { id },
    data: { title }
  });
  
  revalidatePath('/dashboard/statuses');
  return status;
}

export async function deleteStatus(id: string) {
  await prisma.status.delete({
    where: { id }
  });
  
  revalidatePath('/dashboard/statuses');
} 