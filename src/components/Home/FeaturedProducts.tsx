import { Button } from '@src/components/ui/button';
import Link from 'next/link';
import CollectionCard from '@src/components/CollectionCard';
import type { Bicycle } from '@generated/prisma';

type FeaturedBicycle = Bicycle & {
  rating: string;
};

export default function FeaturedProducts({
  bicycles,
}: {
  bicycles: FeaturedBicycle[];
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-24">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Featured Rides</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl text-lg">
            Discover our hand-picked selection of top-rated bicycles, designed for unparalleled performance and aesthetic excellence.
          </p>
        </div>
        <Link href="/product" className="hidden sm:inline-block">
          <Button variant="link" className="text-lg">View All Products →</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
        {bicycles.map((item) => (
          <div key={item.id} className="group transition-transform hover:-translate-y-1">
            <CollectionCard
              id={item.id}
              title={item.title}
              price={item.price}
              rating={item.rating}
              colors={item.colors}
              imageUrl={item.images[0]}
            />
          </div>
        ))}
      </div>
      
      <div className="mt-8 flex justify-center sm:hidden">
        <Link href="/product" className="w-full">
          <Button variant="outline" size="lg" className="w-full">View All Products</Button>
        </Link>
      </div>
    </section>
  );
}
