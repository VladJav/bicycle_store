import type React from 'react';

import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@src/components/ui/avatar';
import { Button } from '@src/components/ui/button';
import { Separator } from '@src/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@src/components/ui/tabs';
import { Bell, Search } from 'lucide-react';
import { Input } from '@src/components/ui/input';
import ReviewForm from '@src/components/ReviewForm/ReviewForm';
import Review from '@src/components/Review/Review';
import ProductImages from '@src/components/ProductImages/ProductImages';
import {
  AddToCart,
  AddToWishlist,
  ShareProduct,
} from '@src/components/ProductActions';
import QuantityChanger from '@src/components/ProductActions/QuantityChanger';
import ColorSelect from '@src/components/ProductActions/ColorSelect';
import { auth } from '@src/lib/auth';
import { getBicycle } from '@src/actions/bicycle';
import CartButton from '@src/components/CartButton/CartButton';
import CartSidebar from '@src/components/layout/CartSidebar/CartSidebar';
import prisma from '@src/lib/prisma';
import ProductConfiguration from '@src/components/ProductConfiguration/ProductConfiguration';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const productId = (await params).id;
  const bicycles = await prisma.bicycle.findMany();
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
    <div className="min-h-screen bg-[#fcfdfd] pb-16">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/" className="mr-8">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fs-OQzXWiKsdo0mSCzNZyZmZHXxrCi0Bp.png"
                alt="Fashion Store"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <nav className="hidden space-x-6 md:flex">
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Shop
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                Collections
              </Link>
              <Link href="/" className="text-gray-500 hover:text-gray-900">
                About
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input className="w-64 pl-10" placeholder="Search products" />
            </div>
            <Button size="icon" variant="ghost">
              <Bell className="h-5 w-5" />
            </Button>
            <CartButton />
            {session && session.user ? (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={session.user.image || ''}
                    alt={session.user.name || ''}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0) || ''}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-medium">{session.user.name}</p>
                </div>
              </div>
            ) : (
              <Button variant="outline">
                <Link href="/auth/sign-in">Sign in</Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Product Details */}
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

        <ReviewForm />
        <div className="mt-16">
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
                        user={session?.user}
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
    </div>
  );
}
