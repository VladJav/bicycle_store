'use client';
import { Button } from '@src/components/ui/button';
import { Separator } from '@src/components/ui/separator';
import useCartStore from '@src/store/useCartStore';
import { cn } from '@src/lib/utils';
import Image from 'next/image';
import { Trash2 as TrashIcon } from 'lucide-react';
import { useMemo } from 'react';
import Link from 'next/link';
import type { Bicycle } from '@generated/prisma';

type CartItem = Bicycle & { quantity?: number; selectedColor?: string };

const CartSidebar = ({ bicycles }: { bicycles: Bicycle[] }) => {
  const {
    isOpen,
    toggleCart,
    items,
    addToCart,
    removeFromCart,
    removeOneItem,
  } = useCartStore();

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

  const totalCost = useMemo(() => {
    return cartItems.reduce(
      (acc, item) => acc + item.price * (item?.quantity || 0),
      0
    );
  }, [cartItems]);

  return (
    <>
      <div
        className={cn(
          'fixed inset-0 bg-black/50 z-40 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={toggleCart}
      />

      <aside
        className={cn(
          'fixed right-0 top-0 bottom-0 z-50 w-96 border-l px-8 py-8 flex-col transition-all duration-300 ease-in-out',
          'bg-white h-screen',
          isOpen ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-2xl font-semibold">My Cart</h3>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full w-12 h-12 border-2"
            onClick={toggleCart}
          >
            <span className="sr-only">Back</span>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6 12H18M6 12L11 7M6 12L11 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Button>
        </div>

        <div className="space-y-8 flex-grow overflow-auto">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex gap-6 bg-white rounded-3xl p-4 shadow-sm"
            >
              <Image
                src={item.images[0] || '/placeholder.svg'}
                alt={item.title}
                width={100}
                height={100}
                className="h-[100px] w-[100px] rounded-2xl bg-[#e0e5ce] object-cover"
              />
              <div className="flex-1">
                <div className="mb-4 flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">{item.title}</h4>
                    {item.selectedColor && (
                      <p className="text-sm text-[#338838] mt-1">
                        COLOR {item.selectedColor}
                      </p>
                    )}
                    <p className="font-semibold mt-2">$ {item.price}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
                <div className="flex items-center justify-end">
                  <div className="flex items-center gap-4 bg-[#f7f7f7] rounded-full px-4 py-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => removeOneItem(item.id)}
                      aria-label={`Decrease quantity of ${item.title}`}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() =>
                        addToCart({
                          color: item.selectedColor || item.colors[0],
                          id: item.id,
                          quantity: 1,
                        })
                      }
                      aria-label={`Increase quantity of ${item.title}`}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between text-base">
            <p className="text-gray-600">Sub Total</p>
            <p className="font-semibold">$ {totalCost.toFixed(2)}</p>
          </div>
          <div className="flex items-center justify-between text-base">
            <p className="text-gray-600">Shipping</p>
            <p className="text-[#338838]">FREE</p>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-lg font-semibold">
            <p>Total</p>
            <p>$ {totalCost.toFixed(2)}</p>
          </div>
          <Button disabled={cartItems.length === 0} className="w-full bg-[#415444] hover:bg-[#415444]/90 rounded-2xl h-14 text-lg font-semibold mt-4">
            <Link href="/checkout">Checkout</Link>
          </Button>
        </div>
      </aside>
    </>
  );
};

export default CartSidebar;
