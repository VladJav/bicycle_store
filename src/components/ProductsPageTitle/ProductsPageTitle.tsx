'use client';

import { Button } from '../ui/button';
import { Filter, Search, SlidersHorizontal, X } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useState } from 'react';
import ProductsFilters from '../ProductsFilters/ProductsFilters';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';
import { updateUrlParams } from '@src/lib/utils/url';
import { useDebouncedCallback } from 'use-debounce';

interface ProductsPageTitleProps {
  colors: string[];
  count: number;
  search?: string;
  sort?: string;
}

export default function ProductsPageTitle({
  colors,
  count = 0,
  search = '',
  sort = 'price-low-high',
}: ProductsPageTitleProps) {  
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const router = useRouter();
  const handleSortOptionChange = (value: string) => {
    router.push(`/product?${updateUrlParams({ sort: value, page: null })}`);
  };
  const debouncedSearch = useDebouncedCallback(
    (value) => {
      router.push(`/product?${updateUrlParams({
        search: value.target.value || null,
        page: null,
      })}`);
    },
    1000
  );
  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between border-b border-border pb-6 pt-2 md:flex-row md:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              All Products
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {count} results
            </p>
          </div>

          {/* Mobile search */}
          <div className="mt-4 w-full md:hidden">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                className="w-full pl-10"
                placeholder="Search products"
                defaultValue={search}
                onChange={debouncedSearch}
              />
            </div>
          </div>

          {/* Mobile filter button */}
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
              <Select defaultValue={sort} onValueChange={handleSortOptionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low-high">
                    Price: Low to High
                  </SelectItem>
                  <SelectItem value="price-high-low">
                    Price: High to Low
                  </SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Desktop sort */}
          <div className="hidden items-center gap-4 md:flex">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Sort by:</span>
            </div>
            <Select defaultValue={sort} onValueChange={handleSortOptionChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low-high">
                  Price: Low to High
                </SelectItem>
                <SelectItem value="price-high-low">
                  Price: High to Low
                </SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="newest">Newest</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Mobile filters drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 flex">
          <div
            className="fixed inset-0 bg-opacity-25"
            onClick={() => setMobileFiltersOpen(false)}
          ></div>
          <div className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-background py-4 pb-12 shadow-xl">
            <div className="flex items-center justify-between px-4">
              <h2 className="text-lg font-medium text-foreground">Filters</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-transparent p-2 text-muted-foreground hover:bg-muted"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Filters */}
            <div className="mt-4 px-4">
              <ProductsFilters colors={colors} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
