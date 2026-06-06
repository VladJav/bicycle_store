import bcrypt from 'bcryptjs';
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const products = [
  {
    id: 'bike-mountain-explorer-pro',
    title: 'Mountain Explorer Pro',
    description:
      'Premium mountain bike with advanced suspension for challenging trails and rough terrain.',
    price: 699.99,
    images: ['/images/bicycles/mountain-explorer-pro.png'],
    features: [
      'Hydraulic disc brakes',
      'Full suspension',
      'Lightweight aluminum frame',
      '29-inch trail tires',
    ],
    colors: ['Red', 'Black', 'Blue'],
  },
  {
    id: 'bike-city-cruiser-deluxe',
    title: 'City Cruiser Deluxe',
    description:
      'Comfortable urban commuter bike with upright riding position and practical accessories.',
    price: 389.99,
    images: ['/images/bicycles/city-cruiser-deluxe.png'],
    features: ['Rear rack', 'Fenders', 'Comfort saddle', '7-speed gears'],
    colors: ['White', 'Mint Green', 'Gray'],
  },
  {
    id: 'bike-road-racer-elite',
    title: 'Road Racer Elite',
    description:
      'Lightweight road bike designed for speed and long-distance performance.',
    price: 999.99,
    images: ['/images/bicycles/road-racer-elite.png'],
    features: [
      'Carbon-style lightweight frame',
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
    price: 1499.99,
    images: ['/images/bicycles/electric-commuter.png'],
    features: ['500W motor', '48V battery', '45-mile range', 'LCD display'],
    colors: ['Matte Black', 'Silver', 'Dark Blue'],
  },
  {
    id: 'bike-hybrid-explorer',
    title: 'Hybrid Explorer',
    description:
      'Versatile hybrid bike suitable for paved roads and light trails.',
    price: 529.99,
    images: ['/images/bicycles/hybrid-explorer.png'],
    features: ['Alloy frame', 'Suspension fork', '24-speed gears', 'Disc brakes'],
    colors: ['Green', 'Black', 'Blue/White'],
  },
  {
    id: 'bike-gravel-trekker',
    title: 'Gravel Trekker',
    description:
      'Adventure-ready gravel bike built for mixed surfaces, weekend trips, and fast backroad riding.',
    price: 849.99,
    images: ['/images/bicycles/gravel-trekker.png'],
    features: [
      'Flared drop handlebars',
      'Tubeless-ready gravel tires',
      'Mounts for bags and bottles',
      'Mechanical disc brakes',
    ],
    colors: ['Sand', 'Black', 'Olive'],
  },
  {
    id: 'bike-folding-metro',
    title: 'Folding Metro',
    description:
      'Compact folding bicycle for apartments, public transport, and flexible city travel.',
    price: 449.99,
    images: ['/images/bicycles/folding-metro.png'],
    features: [
      'Quick-folding frame',
      '20-inch wheels',
      'Rear cargo rack',
      'Adjustable handlebar stem',
    ],
    colors: ['Silver', 'Orange', 'Black'],
  },
  {
    id: 'bike-kids-trail-20',
    title: 'Kids Trail 20',
    description:
      'Durable 20-inch youth bike with confident handling for parks, paths, and first trail rides.',
    price: 279.99,
    images: ['/images/bicycles/kids-trail-20.png'],
    features: [
      '20-inch wheels',
      'Front suspension',
      'Easy-reach brake levers',
      'Reflectors included',
    ],
    colors: ['Teal', 'Yellow', 'Purple'],
  },
  {
    id: 'bike-cargo-utility',
    title: 'Cargo Utility',
    description:
      'Long-tail cargo bike for groceries, errands, and daily utility hauling around town.',
    price: 1199.99,
    images: ['/images/bicycles/cargo-utility.png'],
    features: [
      'Extended rear cargo rack',
      'Wide puncture-resistant tires',
      'Double kickstand',
      'Upright commuter cockpit',
    ],
    colors: ['Navy', 'Black', 'Steel Blue'],
  },
  {
    id: 'bike-bmx-freestyle',
    title: 'BMX Freestyle',
    description:
      'Compact freestyle BMX with a tough frame, responsive handling, and park-ready components.',
    price: 329.99,
    images: ['/images/bicycles/bmx-freestyle.png'],
    features: [
      '20-inch BMX wheels',
      'Stunt pegs',
      'Platform pedals',
      'Reinforced steel frame',
    ],
    colors: ['Cobalt Blue', 'Black', 'Chrome'],
  },
];

async function main() {
  await prisma.$transaction([
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.review.deleteMany(),
    prisma.bicycle.deleteMany(),
    prisma.status.deleteMany(),
  ]);

  const adminPassword = await bcrypt.hash('Admin12345', 10);
  const customerPassword = await bcrypt.hash('Customer12345', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@biker.test' },
    update: {
      name: 'Demo Admin',
      role: 'ADMIN',
      password: adminPassword,
      phone: '+380501112233',
      country: 'Ukraine',
      city: 'Kyiv',
    },
    create: {
      id: 'user-demo-admin',
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
      phone: '+380671234567',
      addressLine1: 'Khreshchatyk Street 1',
      city: 'Kyiv',
      state: 'Kyiv',
      zip: '01001',
      country: 'UA',
    },
    create: {
      id: 'user-demo-customer',
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
    await prisma.bicycle.create({ data: product });
  }

  for (const title of ['On hold', 'Processing', 'Shipped', 'Delivered']) {
    await prisma.status.create({ data: { title } });
  }

  await prisma.review.createMany({
    data: [
      {
        id: 'review-mountain-demo',
        title: 'Great trail bike',
        comment: 'Stable on rough paths and comfortable enough for long rides.',
        rating: 5,
        helpful: 0,
        userId: customer.id,
        bicycleId: 'bike-mountain-explorer-pro',
      },
      {
        id: 'review-city-demo',
        title: 'Good city choice',
        comment: 'Comfortable position and useful accessories for commuting.',
        rating: 4,
        helpful: 0,
        userId: admin.id,
        bicycleId: 'bike-city-cruiser-deluxe',
      },
      {
        id: 'review-electric-demo',
        title: 'Easy daily commute',
        comment: 'The motor assistance makes longer rides across town feel simple.',
        rating: 5,
        helpful: 0,
        userId: customer.id,
        bicycleId: 'bike-electric-commuter',
      },
    ],
  });

  const status = await prisma.status.findUniqueOrThrow({
    where: { title: 'Processing' },
  });

  await prisma.order.create({
    data: {
      userId: customer.id,
      statusId: status.id,
      stripeIntentId: 'seeded-demo-payment',
      address: 'Khreshchatyk Street 1, Kyiv, 01001, UA',
      shippingMethod: 'Nova Poshta',
      shippingCost: 5,
      total: 704.99,
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

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
