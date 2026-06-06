'use client';

import { Search } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@src/components/ui/input';
import { useDebouncedCallback } from 'use-debounce';

interface ProductSearchInputProps {
  className?: string;
  defaultValue?: string;
}

export default function ProductSearchInput({
  className = '',
  defaultValue = '',
}: ProductSearchInputProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debouncedSearch = useDebouncedCallback((value: string) => {
    const params =
      pathname === '/product'
        ? new URLSearchParams(searchParams.toString())
        : new URLSearchParams();

    if (value) {
      params.set('search', value);
    } else {
      params.delete('search');
    }
    params.delete('page');

    const query = params.toString();
    router.push(`/product${query ? `?${query}` : ''}`);
  }, 500);

  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        className="w-full pl-10 bg-background text-foreground"
        placeholder="Search products"
        defaultValue={defaultValue}
        onChange={(event) => debouncedSearch(event.target.value)}
      />
    </div>
  );
}
