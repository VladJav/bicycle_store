import { SlidersHorizontal, X } from 'lucide-react';
import { Select, SelectValue } from '../ui/select';
import { SelectTrigger } from '../ui/select';
import { SelectItem } from '../ui/select';
import { Filter } from 'lucide-react';
import { Button } from '../ui/button';

import { SelectContent } from '../ui/select';
import { useEffect, useState } from 'react';
import ProductsFilters from '../ProductsFilters/ProductsFilters';

export default function ProductSort() {
  const [sortOption, setSortOption] = useState('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  useEffect(() => {
  }, [sortOption]);
  return (
    <>
      <div className="mt-4 flex w-full items-center justify-between md:hidden">
        <Button
          onClick={() => setMobileFiltersOpen(true)}
          variant="outline"
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
        <div className="w-40">
          <Select defaultValue="featured" onValueChange={setSortOption}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="hidden items-center gap-4 md:flex">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium">Sort by:</span>
        </div>
        <Select value={sortOption} onValueChange={setSortOption}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="price-low-high">Price: Low to High</SelectItem>
            <SelectItem value="price-high-low">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-opacity-25"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-gray-900">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 px-4">
              {/* @ts-expect-error - TODO: fix this */}
              <ProductsFilters />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
