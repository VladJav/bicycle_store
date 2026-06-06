'use client';

import { ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@src/components/ui/card';
import { Separator } from '@src/components/ui/separator';
import useCartStore from '@src/store/useCartStore';
import { useMemo } from 'react';
import type { Bicycle } from '@generated/prisma';
import { shippingOptions } from '@src/constants/core';
import { DeliveryDetails } from '@src/types/Checkout';

type CartItem = Bicycle & { quantity?: number; selectedColor?: string };

const OrderSummary = ({
  bicycles,
  selectedShipping,
}: {
  bicycles: Bicycle[];
  selectedShipping: DeliveryDetails;
}) => {
  const { items } = useCartStore();
  const cartItems = useMemo(() => {
    return items
      .reduce<CartItem[]>((acc, item) => {
        const bicycle = bicycles.find((bicycle) => bicycle.id === item.id);
        if (bicycle) {
          acc.push({
            ...bicycle,
            selectedColor: item.color,
            quantity: item.quantity,
          });
        }
        return acc;
      }, [])
      .sort((a, b) => a.title.localeCompare(b.title));
  }, [items, bicycles]);

  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item?.quantity || 0),
      0
    );
  }, [cartItems]);

  const shippingCost = useMemo(() => {
    return (
      shippingOptions.find(
        (option) => option.id === selectedShipping.shippingOption
      )?.price ?? 0
    );
  }, [selectedShipping.shippingOption]);

  const tax = useMemo(() => {
    return 0;
  }, []);

  const total = useMemo(() => {
    return subtotal + shippingCost + tax;
  }, [subtotal, shippingCost, tax]);

  return (
    <div className="md:col-span-1">
      <Card className="border-0 shadow-md">
        <CardHeader className="border-b pb-4">
          <CardTitle className="flex items-center">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                  <Image
                    src={item.images[0] || '/placeholder.svg'}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between text-base font-medium">
                    <h3 className="line-clamp-1">{item.title}</h3>
                    <p className="ml-4">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-end justify-between text-sm">
                    <p className="text-muted-foreground">Quantity {item.quantity}</p>
                    <p className="ml-4">${((item.quantity || 0) * item.price).toFixed(2)}</p>
                  </div>
                  <div className="flex items-end justify-between text-sm">
                    <p className="text-muted-foreground">Color {item.selectedColor}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Separator className="my-4" />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <p>Subtotal</p>
              <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Shipping</p>
              <p>${shippingCost.toFixed(2)}</p>
            </div>
            <div className="flex justify-between text-sm">
              <p>Tax</p>
              <p>${tax.toFixed(2)}</p>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <p>Total</p>
              <p>${total.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderSummary;
