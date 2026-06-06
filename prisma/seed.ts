import bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const products = [
  {
    id: 'bike-mountain-explorer-pro',
    title: 'Mountain Explorer Pro',
    description:
      'Premium mountain bike with advanced suspension for challenging trails and rough terrain.',
    price: 599.99,
    images: [
      '/images/epic_hero.png',
      '/images/generated-image.png',
      '/images/bicycle-checkout.png',
    ],
    features: [
      'Hydraulic disc brakes',
      'Front suspension',
      'Aluminum frame',
      '21-speed shifters',
    ],
    colors: ['Red', 'Black', 'Blue'],
  },
  {
    id: 'bike-city-cruiser-deluxe',
    title: 'City Cruiser Deluxe',
    description:
      'Comfortable urban commuter bike with upright riding position and practical accessories.',
    price: 349.99,
    images: ['/images/generated-image (1).png', '/images/bicycle-logo.png'],
    features: ['Rear rack', 'Fenders', 'Comfort saddle', '7-speed gears'],
    colors: ['White', 'Mint Green', 'Gray'],
  },
  {
    id: 'bike-road-racer-elite',
    title: 'Road Racer Elite',
    description:
      'Lightweight road bike designed for speed and long-distance performance.',
    price: 899.99,
    images: ['/images/hero_banner.png', '/images/promo_ad.png'],
    features: [
      'Lightweight frame',
      'Aerodynamic design',
      '22-speed drivetrain',
      'Drop handlebars',
    ],
    colors: ['Black/Red', 'White/Blue', 'Yellow'],
  },
  {
    id: 'bike-electric-commuter',
    title: 'Electric Commuter',
    description:
      'Electric bike with long-range battery for effortless city commuting.',
    price: 1299.99,
    images: ['/images/bicycle-checkout.png', '/images/generated-image.png'],
    features: ['500W motor', '48V battery', '45-mile range', 'LCD display'],
    colors: ['Matte Black', 'Silver', 'Dark Blue'],
  },
  {
    id: 'bike-hybrid-explorer',
    title: 'Hybrid Explorer',
    description:
      'Versatile hybrid bike suitable for paved roads and light trails.',
    price: 479.99,
    images: ['/images/generated-image.png', '/images/epic_hero.png'],
    features: ['Alloy frame', 'Suspension fork', '24-speed gears', 'Disc brakes'],
    colors: ['Green', 'Black', 'Blue/White'],
  },
];

async function main() {
  const adminPassword = await bcrypt.hash('Admin12345', 10);
  const customerPassword = await bcrypt.hash('Customer12345', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@biker.test' },
    update: {
      name: 'Demo Admin',
      role: 'ADMIN',
      password: adminPassword,
    },
    create: {
      name: 'Demo Admin',
      email: 'admin@biker.test',
      role: 'ADMIN',
      password: adminPassword,
      phone: '+380501112233',
      country: 'Ukraine',
      city: 'Kyiv',
    },
  });

  const customer = await prisma.user.upsert({
    where: { email: 'customer@biker.test' },
    update: {
      name: 'Demo Customer',
      role: 'USER',
      password: customerPassword,
    },
    create: {
      name: 'Demo Customer',
      email: 'customer@biker.test',
      role: 'USER',
      password: customerPassword,
      phone: '+380671234567',
      addressLine1: 'Khreshchatyk Street 1',
      city: 'Kyiv',
      state: 'Kyiv',
      zip: '01001',
      country: 'UA',
    },
  });

  for (const product of products) {
    await prisma.bicycle.upsert({
      where: { id: product.id },
      update: product,
      create: product,
    });
  }

  for (const title of ['On hold', 'Processing', 'Shipped', 'Delivered']) {
    await prisma.status.upsert({
      where: { title },
      update: {},
      create: { title },
    });
  }

  await prisma.review.upsert({
    where: { id: 'review-mountain-demo' },
    update: {
      rating: 5,
      title: 'Great trail bike',
      comment: 'Stable on rough paths and comfortable enough for long rides.',
    },
    create: {
      id: 'review-mountain-demo',
      title: 'Great trail bike',
      comment: 'Stable on rough paths and comfortable enough for long rides.',
      rating: 5,
      helpful: 0,
      userId: customer.id,
      bicycleId: 'bike-mountain-explorer-pro',
    },
  });

  await prisma.review.upsert({
    where: { id: 'review-city-demo' },
    update: {
      rating: 4,
      title: 'Good city choice',
      comment: 'Comfortable position and useful accessories for commuting.',
    },
    create: {
      id: 'review-city-demo',
      title: 'Good city choice',
      comment: 'Comfortable position and useful accessories for commuting.',
      rating: 4,
      helpful: 0,
      userId: admin.id,
      bicycleId: 'bike-city-cruiser-deluxe',
    },
  });

  const status = await prisma.status.findUniqueOrThrow({
    where: { title: 'Processing' },
  });
  const existingOrder = await prisma.order.findFirst({
    where: { stripeIntentId: 'seeded-demo-payment' },
  });

  if (!existingOrder) {
    await prisma.order.create({
      data: {
        userId: customer.id,
        statusId: status.id,
        stripeIntentId: 'seeded-demo-payment',
        address: 'Khreshchatyk Street 1, Kyiv, 01001, UA',
        shippingMethod: 'Nova Poshta',
        shippingCost: 3,
        total: 602.99,
        orderItems: {
          create: [
            {
              bicycleId: 'bike-mountain-explorer-pro',
              quantity: 1,
              color: 'Black',
            },
          ],
        },
      },
    });
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
