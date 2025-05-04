'use client';

import { Heart } from 'lucide-react';

import { Button } from '../ui/button';

const AddToWishlist = () => {
  const handleAddToWishlist = () => {
    console.log('Add to Wishlist');
  };
  return (
    <Button
      onClick={handleAddToWishlist}
      variant="outline"
      className="flex h-12 w-12 items-center justify-center rounded-full p-0"
    >
      <Heart className="h-5 w-5" />
      <span className="sr-only">Add to Wishlist</span>
    </Button>
  );
};

export default AddToWishlist;
