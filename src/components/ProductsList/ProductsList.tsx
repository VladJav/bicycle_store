'use client';

import { Button } from '../ui/button';
import Link from 'next/link';
import { Card } from '../ui/card';
import Image from 'next/image';
import useCartStore from '@src/store/useCartStore';
import type { Bicycle } from '@generated/prisma';

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: Date;
};

type ProductWithRating = Bicycle & {
  rating: string;
  reviews: Review[];
};

export default function ProductsList({ products }: { products: ProductWithRating[] }) {
  const { addToCart, setIsOpen } = useCartStore();

  const handleAddToCart = (product: ProductWithRating) => {
    addToCart({
      id: product.id,
      color: product.colors[0],
      quantity: 1,
    });
    setIsOpen(true);
  };

  return (
    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
      {products.map((product: ProductWithRating) => (
        <Card
          key={product.id}
          className="group relative overflow-hidden rounded-lg border-0 shadow-sm transition-all duration-300 hover:shadow-md"
        >
          <div className="relative aspect-square overflow-hidden bg-secondary">
            <Link href={`/product/${product.id}`}>
              <Image
                src={product.images[0] || '/placeholder.svg'}
                alt={product.title}
                width={500}
                height={500}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleAddToCart(product)}
                  className="bg-background text-foreground hover:bg-muted"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </div>
          <div className="p-4">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-lg font-medium text-foreground">
                {product.title}
              </h3>
            </Link>
            <div className="mt-1 flex items-center">
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating) => (
                  <svg
                    key={rating}
                    className={`h-4 w-4 ${
	                      Number(product.rating) > rating
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-muted text-muted'
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-.995 4.695c-.181.832.752 1.47 1.499 1.033L10 15.591l4.15 2.556c.747.437 1.68-.201 1.499-1.033l-.995-4.695 3.62-3.102c.635-.544.297-1.584-.536-1.651l-4.753-.381-1.83-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="ml-1 text-xs text-muted-foreground">
                ({product.reviews.length})
              </span>
            </div>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-lg font-semibold text-primary">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
