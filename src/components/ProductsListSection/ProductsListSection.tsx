import Link from 'next/link';

import ProductsList from '@src/components/ProductsList/ProductsList';
import { getAllBicycles, getBicyclesCount } from '@src/actions/bicycle';
import { Prisma } from '@generated/prisma';
import { createBicycleWhere } from '@src/lib/bicycleCategories';

const BICYCLES_PER_PAGE = 10;
const pageButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium shadow-xs transition-all hover:bg-secondary';
const activePageButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90';
const disabledIconButtonClass =
  'inline-flex h-8 w-8 items-center justify-center rounded-full border bg-background text-sm font-medium opacity-50';
const clearFiltersClass =
  'mt-4 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-xs transition-all hover:bg-primary/90';

export default async function ProductsListSection({
  page = '1',
  price,
  colors,
  search,
  sort = 'price-low-high',
  category,
  categoryIds,
}: {
  page: string;
  price?: string;
  colors?: string;
  search?: string;
  sort?: string;
  category?: string;
  categoryIds?: string[];
}) {
  const currentPage = Math.max(1, parseInt(page) || 1);
  const where = createBicycleWhere({ price, colors, search, categoryIds });

  const orderBy: Prisma.BicycleOrderByWithRelationInput =
    sort === 'price-high-low'
      ? { price: 'desc' }
      : sort === 'newest' || sort === 'featured'
        ? { createdAt: 'desc' }
        : { price: 'asc' };

  const bicycles = sort === 'rating'
    ? (await getAllBicycles({
      where,
      include: { reviews: true },
    }))
      .sort((a, b) => Number(b.rating) - Number(a.rating))
      .slice((currentPage - 1) * BICYCLES_PER_PAGE, currentPage * BICYCLES_PER_PAGE)
    : await getAllBicycles({
      where,
      orderBy,
      include: { reviews: true },
      take: BICYCLES_PER_PAGE,
      skip: (currentPage - 1) * BICYCLES_PER_PAGE,
    });

  const totalBicycles = await getBicyclesCount({ where });
  const totalPages = Math.ceil(totalBicycles / BICYCLES_PER_PAGE);
  const createPageHref = (pageNumber: number) => {
    const params = new URLSearchParams();

    if (pageNumber > 1) params.set('page', String(pageNumber));
    if (price) params.set('price', price);
    if (colors) params.set('colors', colors);
    if (search) params.set('search', search);
    if (sort) params.set('sort', sort);
    if (category) params.set('category', category);

    const query = params.toString();
    return `/product${query ? `?${query}` : ''}`;
  };
  const clearFiltersHref = category ? `/product?category=${category}` : '/product';

  return (
    <div className="lg:col-span-3">
      {bicycles.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed border-muted-foreground/50 p-8 text-center">
          <h3 className="text-lg font-medium text-foreground">
            No products found
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters or search query.
          </p>
          <Link href={clearFiltersHref} className={clearFiltersClass}>
            Clear All Filters
          </Link>
        </div>
      ) : (
        <ProductsList products={bicycles} />
      )}

      {bicycles.length > 0 && totalPages > 1 && (
        <div className="mt-12 flex items-center justify-center">
          <nav className="flex items-center space-x-2">
            {currentPage === 1 ? (
              <span className={disabledIconButtonClass}>
                <span className="sr-only">Previous Page</span>
              </span>
            ) : (
              <Link
                href={createPageHref(currentPage - 1)}
                className={pageButtonClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                <span className="sr-only">Previous Page</span>
              </Link>
            )}
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber <= 3 ||
                pageNumber > totalPages - 2 ||
                Math.abs(pageNumber - currentPage) <= 1
              ) {
                return (
                  <Link
                    key={index}
                    href={createPageHref(pageNumber)}
                    className={
                      pageNumber === currentPage
                        ? activePageButtonClass
                        : pageButtonClass
                    }
                  >
                    {pageNumber}
                  </Link>
                );
              } else if (
                pageNumber === 4 ||
                pageNumber === totalPages - 3
              ) {
                return (
                  <span key={index} className="text-sm text-muted-foreground">
                    ...
                  </span>
                );
              }
              return null;
            })}
            {currentPage === totalPages ? (
              <span className={disabledIconButtonClass}>
                <span className="sr-only">Next Page</span>
              </span>
            ) : (
              <Link
                href={createPageHref(currentPage + 1)}
                className={pageButtonClass}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
                <span className="sr-only">Next Page</span>
              </Link>
            )}
          </nav>
        </div>
      )}
    </div>
  );
}
