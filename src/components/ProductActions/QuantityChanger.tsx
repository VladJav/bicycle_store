'use client';

import { Minus, Plus } from 'lucide-react';
interface QuantityChangerProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

const QuantityChanger = ({ quantity, setQuantity }: QuantityChangerProps) => {
  const handleQuantityChange = (change: number) => {
    if (quantity + change > 0) {
      setQuantity(quantity + change);
    }
  };
  return (
    <div className="flex w-32 items-center rounded-full border border-input">
      <button
        onClick={() => handleQuantityChange(-1)}
        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="flex-1 text-center">{quantity}</span>
      <button
        onClick={() => handleQuantityChange(1)}
        className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-muted"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};

export default QuantityChanger;
