'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

import { BICYCLE_CATEGORIES } from '@src/lib/bicycleCategories';

export default function ShopCategoryMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setOpen(false);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onClick={() => setOpen((current) => !current)}
        className="inline-flex items-center gap-1 text-muted-foreground outline-none hover:text-foreground focus:text-foreground"
      >
        Shop
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      <div
        role="menu"
        aria-label="Shop categories"
        className={`absolute left-0 top-full z-50 w-[360px] pt-3 transition-all duration-150 ${
          open
            ? 'visible translate-y-0 opacity-100'
            : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <div className="rounded-md border border-border bg-popover p-3 text-popover-foreground shadow-lg">
          <Link
            href="/product"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="block rounded-sm px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
          >
            All bicycles
          </Link>
          <div className="my-2 border-t border-border" />
          <div className="grid grid-cols-2 gap-1">
            {BICYCLE_CATEGORIES.map((category) => (
              <Link
                key={category.id}
                href={`/product?category=${category.id}`}
                role="menuitem"
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-2 hover:bg-accent hover:text-accent-foreground"
              >
                <span className="block text-sm font-medium">
                  {category.label}
                </span>
                <span className="block text-xs leading-snug text-muted-foreground">
                  {category.description}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
