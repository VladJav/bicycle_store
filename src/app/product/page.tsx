import Link from 'next/link';
import { Suspense } from 'react';

import ProductsFilters from '@src/components/ProductsFilters/ProductsFilters';
import ProductsPageTitle from '@src/components/ProductsPageTitle/ProductsPageTitle';
import ProductsListSection from '@src/components/ProductsListSection/ProductsListSection';
import { getAllBicyclesColors, getBicyclesCount } from '@src/actions/bicycle';
import { Prisma } from '@generated/prisma';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: string; price: string; colors: string; search: string; sort: string }>;
}) {
  const {
    page = '1',
    price,
    colors,
    search,
    sort = 'price-low-high',
  } = await searchParams;
  const colorsList = await getAllBicyclesColors();
  const priceRange = price?.split('-').map((value) => parseInt(value));
  const where: Prisma.BicycleWhereInput = {
    price: priceRange
      ? {
        gte: priceRange[0],
        lte: priceRange[1],
      }
      : {
        gte: 100,
        lte: Number.MAX_SAFE_INTEGER,
      },
    colors: colors ? {
      hasSome: colors.split(','),
    } : undefined,
    OR: search
      ? [
        {
          title: {
            contains: search,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      ]
      : undefined,
  };
  const bicyclesCount = await getBicyclesCount({ where });

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

      <ProductsPageTitle colors={colorsList} count={bicyclesCount} search={search} sort={sort} />

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
                search={search}
                sort={sort}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
