'use client';

import { ShoppingBagIcon } from 'lucide-react';

import { Button } from '../ui/button';

interface AddToCartProps {
  handleAddToCart: () => void;
}

const AddToCart = ({ handleAddToCart }: AddToCartProps) => {
  return (
    <Button
      onClick={handleAddToCart}
      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <ShoppingBagIcon className="mr-2 h-5 w-5" />
      Add to Cart
    </Button>
  );
};

export default AddToCart;
