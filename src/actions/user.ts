'use server';

import prisma from '@src/lib/prisma';
import { revalidatePath } from 'next/cache';
import { requireAdmin, requireUser } from '@src/lib/authz';
import bcrypt from 'bcryptjs';

export async function deleteUser(id: string) {
  await requireAdmin();

  const ordersCount = await prisma.order.count({
    where: {
      userId: id,
    },
  });

  if (ordersCount > 0) {
    throw new Error('Cannot delete a customer with existing orders');
  }

  await prisma.user.delete({
    where: {
      id,
    },
  });
  revalidatePath('/dashboard/customers');
}

export async function getUsers(offset: number) {
  await requireAdmin();

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

export async function updateProfile(data: {
  name?: string;
  phone?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
}) {
  const session = await requireUser();

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data,
  });
  revalidatePath('/profile');
  revalidatePath('/settings');
}

export async function updatePassword(
  currentPassword: string,
  newPassword: string
) {
  const session = await requireUser();

  if (newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters');
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      password: true,
    },
  });

  if (!user?.password) {
    throw new Error('Password login is not enabled for this account');
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    throw new Error('Current password is incorrect');
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      password: hashedPassword,
    },
  });
}
