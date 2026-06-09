import Link from 'next/link';
import { Suspense } from 'react';

import ProductsFilters from '@src/components/ProductsFilters/ProductsFilters';
import ProductsPageTitle from '@src/components/ProductsPageTitle/ProductsPageTitle';
import ProductsListSection from '@src/components/ProductsListSection/ProductsListSection';
import {
  getAllBicyclesColors,
  getBicycleCategoryCounts,
  getBicyclesCount,
} from '@src/actions/bicycle';
import {
  createBicycleWhere,
  getBicycleCategory,
} from '@src/lib/bicycleCategories';

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    price?: string;
    colors?: string;
    search?: string;
    sort?: string;
    category?: string;
  }>;
}) {
  const {
    page = '1',
    price,
    colors,
    search,
    sort = 'price-low-high',
    category,
  } = await searchParams;
  const selectedCategoryDetails = getBicycleCategory(category);
  const selectedCategory = selectedCategoryDetails?.id;
  const [colorsList, categoryCounts] = await Promise.all([
    getAllBicyclesColors(),
    getBicycleCategoryCounts(),
  ]);
  const selectedCategoryIds = selectedCategory
    ? categoryCounts.idsByCategory[selectedCategory] ?? []
    : undefined;
  const where = createBicycleWhere({
    price,
    colors,
    search,
    categoryIds: selectedCategoryIds,
  });
  const bicyclesCount = await getBicyclesCount({ where });

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex flex-wrap items-center gap-y-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">
            Home
          </Link>
          <span className="mx-2">/</span>
          {selectedCategoryDetails ? (
            <>
              <Link href="/product" className="hover:text-foreground">
                All Products
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{selectedCategoryDetails.label}</span>
            </>
          ) : (
            <span className="text-foreground">All Products</span>
          )}
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
                category={selectedCategory}
                categoryIds={selectedCategoryIds}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </>
  );
}
