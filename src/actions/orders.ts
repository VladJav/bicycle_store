'use server';
import prisma from '@src/lib/prisma';

interface CreateOrderParams {
  stripeIntentId: string;
  address: string;
  userId: string;
  items: {
    quantity: number;
    bicycleId: string;
  }[];
}

export const createOrder = async (order: CreateOrderParams) => {
  await prisma.order.create({
    data: {
      stripeIntentId: order.stripeIntentId,
      address: order.address,
      user: {
        connect: {
          id: order.userId,
        },
      },
      status: {
        connectOrCreate: {
          where: { title: 'On hold' },
          create: { title: 'On hold' },
        },
      },
      orderItems: {
        create: order.items.map((item) => ({
          quantity: item.quantity,
          bicycle: {
            connect: {
              id: item.bicycleId,
            },
          },
        })),
      },
    },
  });
};

export const getOrders = async (offset: number) => {
  const orders = await prisma.order.findMany({
    take: offset,
    skip: Math.max(0, offset - 5),
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      status: {
        select: {
          title: true,
        },
      },
      orderItems: {
        include: {
          bicycle: {
            select: {
              title: true,
              price: true,
              images: true,
            },
          },
        },
      },
    },
  });

  const total = await prisma.order.count();

  return { orders, total };
};

export const updateOrderStatus = async (orderId: string, statusTitle: string) => {
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: {
        connectOrCreate: {
          where: { title: statusTitle },
          create: { title: statusTitle },
        },
      },
    },
  });
};