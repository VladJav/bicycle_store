import Link from 'next/link';
import { Suspense } from 'react';

import ProductsFilters from '@src/components/ProductsFilters/ProductsFilters';
import ProductsPageTitle from '@src/components/ProductsPageTitle/ProductsPageTitle';
import ProductsListSection from '@src/components/ProductsListSection/ProductsListSection';
import { getAllBicyclesColors, getAllBicycles, getBicyclesCount } from '@src/actions/bicycle';
import CartSidebar from '@src/components/layout/CartSidebar';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; price: string; colors: string; sort: string }>;
}) {
  const {
    page = '1',
    price,
    colors,
    sort = 'price-low-high',
  } = await searchParams;
  const colorsList = await getAllBicyclesColors();
  const bicycles = await getAllBicycles({});
  const bicyclesCount = await getBicyclesCount({
    where: {
      price: price
        ? {
          gte: parseInt(price.split('-')[0]),
          lte: parseInt(price.split('-')[1]),
        }
        : {
          gte: 100,
          lte: Number.MAX_SAFE_INTEGER,
        },
      colors: colors ? {
        hasSome: colors.split(','),
      } : undefined,
    },
  });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">All Products</span>
        </nav>
      </div>

      <ProductsPageTitle colors={colorsList} count={bicyclesCount} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="pb-24 pt-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <div className="hidden lg:block">
              <h2 className="sr-only">Filters</h2>
              <ProductsFilters colors={colorsList} />
            </div>

            <Suspense fallback={<div>Loading products...</div>}>
              <ProductsListSection
                page={page}
                price={price}
                colors={colors}
                sort={sort}
              />
            </Suspense>
          </div>
        </div>
      </div>
      <CartSidebar bicycles={bicycles} />
    </>
  );
}
