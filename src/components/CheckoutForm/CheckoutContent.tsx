'use client';

import type { Bicycle } from '@generated/prisma';
import OrderSummary from '@src/components/OrderSummary/OrderSummary';
import { DeliveryDetails } from '@src/types/Checkout';
import { useState } from 'react';
import CheckoutForm from './CheckoutForm';

interface CheckoutContentProps {
  bicycles: Bicycle[];
  user: {
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    addressLine1?: string | null;
    city?: string | null;
    state?: string | null;
    zip?: string | null;
    country?: string | null;
  } | null;
}

export default function CheckoutContent({
  bicycles,
  user,
}: CheckoutContentProps) {
  const [selectedShipping, setSelectedShipping] = useState<DeliveryDetails>({
    shippingOption: 'nova-poshta',
  });

  return (
    <div className="grid gap-8 md:grid-cols-3">
      <OrderSummary bicycles={bicycles} selectedShipping={selectedShipping} />
      <CheckoutForm
        bicycles={bicycles}
        user={user}
        selectedShipping={selectedShipping}
        setSelectedShipping={setSelectedShipping}
      />
    </div>
  );
}
