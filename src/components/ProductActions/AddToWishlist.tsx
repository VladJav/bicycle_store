'use client';

import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';

const WISHLIST_KEY = 'bicycle-store-wishlist';

const AddToWishlist = ({ productId }: { productId: string }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(
      localStorage.getItem(WISHLIST_KEY) || '[]'
    ) as string[];
    setIsWishlisted(wishlist.includes(productId));
  }, [productId]);

  const handleToggleWishlist = () => {
    const wishlist = JSON.parse(
      localStorage.getItem(WISHLIST_KEY) || '[]'
    ) as string[];
    const nextWishlist = wishlist.includes(productId)
      ? wishlist.filter((id) => id !== productId)
      : [...wishlist, productId];

    localStorage.setItem(WISHLIST_KEY, JSON.stringify(nextWishlist));
    setIsWishlisted(nextWishlist.includes(productId));
  };

  return (
    <Button
      onClick={handleToggleWishlist}
      variant="outline"
      className="flex h-12 w-12 items-center justify-center rounded-full p-0"
      aria-pressed={isWishlisted}
    >
      <Heart className={`h-5 w-5 ${isWishlisted ? 'fill-primary text-primary' : ''}`} />
      <span className="sr-only">
        {isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
      </span>
    </Button>
  );
};

export default AddToWishlist;
