import Link from 'next/link';

import { Button } from '@src/components/ui/button';
import ProductsList from '@src/components/ProductsList/ProductsList';
import { getAllBicycles, getBicyclesCount } from '@src/actions/bicycle';

const BICYCLES_PER_PAGE = 10;

export default async function ProductsListSection({
  page = '1',
  price,
  colors,
  sort = 'price-low-high',
}: {
  page: string;
  price?: string;
  colors?: string;
  sort?: string;
}) {
  const bicycles = await getAllBicycles({
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
    orderBy: {
      ...(sort === 'price-low-high' && { price: 'asc' }),
      ...(sort === 'price-high-low' && { price: 'desc' }),
      ...(sort === 'rating' && { rating: 'desc' }),
      ...(sort === 'newest' && { createdAt: 'desc' }),
    },
    include: { reviews: true },
    take: BICYCLES_PER_PAGE,
    skip: (parseInt(page) - 1) * BICYCLES_PER_PAGE,
  });

  const totalBicycles = await getBicyclesCount({});
  const totalPages = Math.ceil(totalBicycles / BICYCLES_PER_PAGE);

  return (
    <div className="lg:col-span-3">
      {bicycles.length === 0 ? (
        <div className="flex h-96 flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-8 text-center">
          <h3 className="text-lg font-medium text-gray-900">
            No products found
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Try adjusting your filters or search query.
          </p>
          <Button className="mt-4 bg-[#415444] hover:bg-[#415444]/90">
            Clear All Filters
          </Button>
        </div>
      ) : (
        // @ts-expect-error - TODO: fix this
        <ProductsList products={bicycles} />
      )}

      {bicycles.length > 0 && (
        <div className="mt-12 flex items-center justify-center">
          <nav className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              disabled={parseInt(page) === 1}
            >
              <Link href={`/product?page=${parseInt(page) - 1}`}>
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
            </Button>
            {Array.from({ length: totalPages }, (_, index) => {
              const pageNumber = index + 1;
              if (
                pageNumber <= 3 ||
                pageNumber > totalPages - 2 ||
                Math.abs(pageNumber - parseInt(page)) <= 1
              ) {
                return (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={`h-8 w-8 rounded-full ${
                      pageNumber === parseInt(page)
                        ? 'bg-[#415444] text-white hover:bg-[#415444]/90'
                        : 'hover:bg-[#e0e5ce]'
                    }`}
                  >
                    <Link href={`/product?page=${pageNumber}`}>
                      {pageNumber}
                    </Link>
                  </Button>
                );
              } else if (
                pageNumber === 4 ||
                pageNumber === totalPages - 3
              ) {
                return (
                  <span key={index} className="text-sm text-gray-500">
                    ...
                  </span>
                );
              }
              return null;
            })}
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full"
              disabled={parseInt(page) === totalPages}
            >
              <Link href={`/product?page=${parseInt(page) + 1}`}>
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
            </Button>
          </nav>
        </div>
      )}
    </div>
  );
} 