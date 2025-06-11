import type React from 'react';

import { Star } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@src/components/ui/button';
import { Separator } from '@src/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@src/components/ui/tabs';
import ReviewForm from '@src/components/ReviewForm/ReviewForm';
import Review from '@src/components/Review/Review';
import ProductImages from '@src/components/ProductImages/ProductImages';
import { getAllBicycles, getBicycle } from '@src/actions/bicycle';
import CartSidebar from '@src/components/layout/CartSidebar/CartSidebar';
import ProductConfiguration from '@src/components/ProductConfiguration/ProductConfiguration';
import { auth } from '@src/lib/auth';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const bicycles = await getAllBicycles({});
  const product = await getBicycle(productId);
  const session = await auth();

  const productReviews = product?.reviews || [];

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Product not found</h1>
          <p className="mt-2 text-gray-600">
            The product you are looking for does not exist.
          </p>
          <Button asChild className="mt-4 bg-[#415444] hover:bg-[#415444]/90">
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Product Images */}
          <ProductImages images={product.images} name={product.title} />

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <div className="mt-2 flex items-center">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(Number(product.rating))
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {product.rating} ({productReviews.length} reviews)
                </span>
              </div>
            </div>

            <div className="text-2xl font-bold text-[#415444]">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-600">{product.description}</p>

            <ProductConfiguration
              colors={product.colors}
              title={product.title}
              description={product.description || ''}
              id={product.id}
            />

            <Separator />

            <div className="space-y-2">
              <h3 className="font-medium">Features</h3>
              <ul className="list-inside list-disc space-y-1 text-gray-600">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {session ? (
          <ReviewForm />
        ) : (
          <div className='mt-8 rounded-lg border border-dashed border-gray-300 p-8 text-center'>
            <h3 className='text-lg font-medium'>Want to leave a review?</h3>
            <p className='mt-2 text-gray-600'>Please sign in to share your experience with this product</p>
          </div>
        )}
        <div className='mt-16'>
          <Tabs defaultValue="reviews">
            <TabsList className="grid w-full grid-cols-1 bg-[#e0e5ce]">
              <TabsTrigger value="reviews">
                Reviews ({productReviews.length})
              </TabsTrigger>
            </TabsList>
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Customer Reviews</h3>
                </div>

                {/* Review List */}
                <div className="space-y-6">
                  {productReviews.length > 0 ? (
                    productReviews.map((review) => (
                      <Review
                        key={review.id}
                        {...review}
                        // @ts-expect-error - TODO: fix this
                        user={review.user}
                        date={review.createdAt.toISOString()}
                      />
                    ))
                  ) : (
                    <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                      <h4 className="text-lg font-medium">No reviews yet</h4>
                      <p className="mt-2 text-gray-600">
                        Be the first to review this product
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <CartSidebar bicycles={bicycles} />
    </>
  );
}
