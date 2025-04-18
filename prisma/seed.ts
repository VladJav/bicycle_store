import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

const bicycleData = [
  {
    title: 'Mountain Explorer',
    description: 'Perfect for rough terrain and mountain trails',
    price: 599.99,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg',
    rating: 4.7
  },
  {
    title: 'City Cruiser',
    description: 'Comfortable ride for urban commuting',
    price: 349.99,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dd.jpg-482Kz4Ro7YXPgsZnttDFsQEmrWQnhG.jpeg',
    rating: 4.2
  },
  {
    title: 'Road Racer',
    description: 'Lightweight and fast for long distances',
    price: 899.99,
    imageUrl: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Index,%20Vanderbrand.jpg-Fv7HHkBaQgZe7HG3hbz5aojPoFRIuo.jpeg',
    rating: 4.9
  }
];

export async function main() {
  for (const bicycle of bicycleData) {
    await prisma.bicycle.create({ data: bicycle });
  }
}

main();
