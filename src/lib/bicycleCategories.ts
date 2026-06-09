import type { Prisma } from '@generated/prisma';

export type BicycleCategory = {
  id: string;
  label: string;
  description: string;
  matchTerms: string[];
};

export type BicycleCategoryWithCount = BicycleCategory & {
  count: number;
};

export type BicycleCategorySource = {
  title: string;
  description?: string | null;
  features: string[];
};

export const BICYCLE_CATEGORIES = [
  {
    id: 'mountain',
    label: 'Mountain',
    description: 'Trail and terrain bikes',
    matchTerms: ['mountain'],
  },
  {
    id: 'road',
    label: 'Road',
    description: 'Fast pavement rides',
    matchTerms: ['road racer', 'road bike'],
  },
  {
    id: 'electric',
    label: 'Electric',
    description: 'Assisted city range',
    matchTerms: ['electric', '500w motor', 'battery'],
  },
  {
    id: 'city',
    label: 'City',
    description: 'Daily urban comfort',
    matchTerms: ['city cruiser', 'urban commuter', 'upright riding'],
  },
  {
    id: 'hybrid',
    label: 'Hybrid',
    description: 'Road and path versatility',
    matchTerms: ['hybrid'],
  },
  {
    id: 'gravel',
    label: 'Gravel',
    description: 'Mixed-surface adventure',
    matchTerms: ['gravel'],
  },
  {
    id: 'folding',
    label: 'Folding',
    description: 'Compact travel storage',
    matchTerms: ['folding', 'quick-folding'],
  },
  {
    id: 'kids',
    label: 'Kids',
    description: 'Youth bikes and paths',
    matchTerms: ['kids', 'youth bike', '20-inch youth'],
  },
  {
    id: 'cargo',
    label: 'Cargo',
    description: 'Utility and hauling',
    matchTerms: ['cargo', 'long-tail', 'hauling'],
  },
  {
    id: 'bmx',
    label: 'BMX',
    description: 'Freestyle and park',
    matchTerms: ['bmx'],
  },
] as const satisfies readonly BicycleCategory[];

type BicycleWhereOptions = {
  price?: string;
  colors?: string;
  search?: string;
  categoryIds?: string[];
};

const getPriceRange = (price?: string) => {
  const [min, max] = price?.split('-').map(Number) ?? [];

  if (Number.isFinite(min) && Number.isFinite(max)) {
    return [min, max] as const;
  }

  return null;
};

export const getBicycleCategory = (categoryId?: string | null) =>
  BICYCLE_CATEGORIES.find((category) => category.id === categoryId);

export const getBicycleCategoryId = (bicycle: BicycleCategorySource) => {
  const searchableText = [
    bicycle.title,
    bicycle.description ?? '',
    ...bicycle.features,
  ]
    .join(' ')
    .toLowerCase();

  return BICYCLE_CATEGORIES.find((category) =>
    category.matchTerms.some((term) => searchableText.includes(term))
  )?.id;
};

export const createBicycleWhere = ({
  price,
  colors,
  search,
  categoryIds,
}: BicycleWhereOptions): Prisma.BicycleWhereInput => {
  const priceRange = getPriceRange(price);
  const selectedColors = colors
    ?.split(',')
    .map((color) => color.trim())
    .filter(Boolean);
  const searchTerm = search?.trim();
  const andFilters = [
    searchTerm
      ? {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: 'insensitive' as const,
            },
          },
        ],
      }
      : undefined,
  ].filter(Boolean) as Prisma.BicycleWhereInput[];

  return {
    id: categoryIds
      ? {
        in: categoryIds,
      }
      : undefined,
    price: priceRange
      ? {
        gte: priceRange[0],
        lte: priceRange[1],
      }
      : {
        gte: 100,
        lte: Number.MAX_SAFE_INTEGER,
      },
    colors: selectedColors?.length
      ? {
        hasSome: selectedColors,
      }
      : undefined,
    AND: andFilters.length ? andFilters : undefined,
  };
};
