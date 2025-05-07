'use client';
import { ShoppingBagIcon } from 'lucide-react';
import useCartStore from '@src/store/useCartStore';
import { Button } from '../ui/button';

const CartButton = () => {
  const { items, toggleCart } = useCartStore();
  return (
    <Button size="icon" variant="ghost" className="relative" onClick={toggleCart}>
      <ShoppingBagIcon className="h-5 w-5" />
      <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#415444] text-xs text-white">
        {items.length}
      </span>
    </Button>
  );
};

export default CartButton;
