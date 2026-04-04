'use client';

import { Separator } from '@radix-ui/react-separator';
import { Button } from '../ui/button';
import { Checkbox } from '../ui/checkbox';
import { Slider } from '../ui/slider';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUrlParams } from '@src/lib/utils/url';

export default function ProductsFilters({ colors }: { colors: string[] }) {
  const [priceRange, setPriceRange] = useState([100, 300]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const router = useRouter();

  const handleColorChange = (color: string, checked: boolean) => {
    const colorsList = checked ? [...selectedColors, color] : selectedColors.filter((c) => c !== color);
    setSelectedColors(colorsList);
    
    router.push(`/product?${updateUrlParams({
      colors: colorsList.length > 0 ? colorsList.join(',') : null,
    })}`);
  };

  const clearAllFilters = () => {
    router.push(`/product?${updateUrlParams({
      price: null,
      colors: null,
    })}`);
    setPriceRange([100, 300]);
    setSelectedColors([]);
  };

  const handlePriceRangeChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const handlePriceRangeCommit = (value: [number, number]) => {
    router.push(`/product?${updateUrlParams({
      price: `${value[0]}-${value[1]}`,
    })}`);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-4 text-lg font-medium">Price Range</h3>
        <Slider
          defaultValue={priceRange}
          min={100}
          max={30000}
          step={10}
          value={priceRange}
          onValueChange={handlePriceRangeChange}
          onValueCommit={handlePriceRangeCommit}
          className="mb-4"
        />
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">${priceRange[0]}</span>
          <span className="text-sm text-muted-foreground">${priceRange[1]}</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-4 text-lg font-medium">Color</h3>
        <div className="space-y-2">
          {colors.map((color) => (
            <div key={color} className="flex items-center">
              <Checkbox
                id={`color-${color}`}
                checked={selectedColors.includes(color)}
                onCheckedChange={(checked) =>
                  handleColorChange(color, checked === true)
                }
                className="border-primary"
              />
              <label
                htmlFor={`color-${color}`}
                className="ml-2 text-sm font-medium text-foreground"
              >
                {color}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <Button
        onClick={clearAllFilters}
        variant="outline"
        className="w-full border-primary text-primary hover:bg-secondary"
      >
        Clear All Filters
      </Button>
    </div>
  );
}
