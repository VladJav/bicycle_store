import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const bicycleData = [
  {
    title: 'Mountain Explorer Pro',
    description: 'Premium mountain bike with advanced suspension for challenging trails and rough terrain',
    price: 599.99,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain-bike-1.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain-bike-2.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mountain-bike-3.jpg'
    ],
    rating: 4.7,
    features: ['Hydraulic Disc Brakes', 'Front Suspension', 'Aluminum Frame', '21-Speed Shifters'],
    colors: ['Red', 'Black', 'Blue']
  },
  {
    title: 'City Cruiser Deluxe',
    description: 'Comfortable urban commuter bike with upright riding position and practical accessories',
    price: 349.99,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/city-bike-1.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/city-bike-2.jpg'
    ],
    rating: 4.2,
    features: ['Rear Rack', 'Fenders', 'Comfort Saddle', '7-Speed Gears', 'LED Lights'],
    colors: ['White', 'Mint Green', 'Gray']
  },
  {
    title: 'Road Racer Elite',
    description: 'Lightweight carbon fiber road bike designed for speed and long-distance performance',
    price: 899.99,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/road-bike-1.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/road-bike-2.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/road-bike-3.jpg'
    ],
    rating: 4.9,
    features: ['Carbon Fiber Frame', 'Aerodynamic Design', '22-Speed Drivetrain', 'Drop Handlebars'],
    colors: ['Black/Red', 'White/Blue', 'Yellow']
  },
  {
    title: 'Electric Commuter',
    description: 'Powerful electric bike with long-range battery for effortless city commuting',
    price: 1299.99,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/electric-bike-1.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/electric-bike-2.jpg'
    ],
    rating: 4.8,
    features: ['500W Motor', '48V Battery', '45-mile Range', 'LCD Display', 'Integrated Lights'],
    colors: ['Matte Black', 'Silver', 'Dark Blue']
  },
  {
    title: 'Hybrid Explorer',
    description: 'Versatile hybrid bike suitable for both paved roads and light trails',
    price: 479.99,
    images: [
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hybrid-bike-1.jpg',
      'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/hybrid-bike-2.jpg'
    ],
    rating: 4.5,
    features: ['Lightweight Alloy Frame', 'Front Suspension Fork', '24-Speed Gears', 'Disc Brakes'],
    colors: ['Green', 'Black', 'Blue/White']
  }
];

export async function main() {
  for (const bicycle of bicycleData) {
    await prisma.bicycle.create({ data: bicycle });
  }
}

main();
