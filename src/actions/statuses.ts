'use server';
import prisma from '@src/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@src/lib/authz';

export async function getStatuses(params: { skip?: number, take?: number }) {
  await requireAdmin();

  const statuses = await prisma.status.findMany(params);

  const total = await prisma.status.count();

  return {
    statuses,
    total
  };
}

export async function createStatus(title: string) {
  await requireAdmin();

  const status = await prisma.status.create({
    data: {
      title
    }
  });
  
  revalidatePath('/dashboard/statuses');
  return status;
}

export async function updateStatus(id: string, title: string) {
  await requireAdmin();

  const status = await prisma.status.update({
    where: { id },
    data: { title }
  });
  
  revalidatePath('/dashboard/statuses');
  return status;
}

export async function deleteStatus(id: string) {
  await requireAdmin();

  const ordersCount = await prisma.order.count({
    where: { statusId: id },
  });

  if (ordersCount > 0) {
    throw new Error('Cannot delete a status that is used by orders');
  }

  await prisma.status.delete({
    where: { id }
  });
  
  revalidatePath('/dashboard/statuses');
}
