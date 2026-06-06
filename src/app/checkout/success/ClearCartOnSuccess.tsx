'use client';

import { useEffect } from 'react';

import useCartStore from '@src/store/useCartStore';

export function ClearCartOnSuccess({ orderId }: { orderId?: string }) {
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (orderId) {
      clearCart();
    }
  }, [clearCart, orderId]);

  return null;
}
