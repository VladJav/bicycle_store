'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@src/components/ui/dialog';
import { Separator } from '@src/components/ui/separator';
import Image from 'next/image';

type OrderDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
	  order: {
	    id: string;
	    address: string;
	    shippingMethod: string;
	    shippingCost: number;
	    total: number;
	    createdAt: Date;
    status: {
      title: string;
    };
    user: {
      name: string | null;
      email: string;
    };
	  orderItems: {
	    quantity: number;
	    color: string;
	    bicycle: {
        title: string;
        price: number;
        images: string[];
      };
    }[];
  };
};

export function OrderDetailsModal({ isOpen, onClose, order }: OrderDetailsModalProps) {
  const totalItems = order.orderItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = order.total || order.orderItems.reduce(
    (acc, item) => acc + item.quantity * item.bicycle.price,
    0
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
          <DialogDescription>
            Order #{order.id} - {order.status.title}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <Separator />

          <div>
            <h3 className="font-semibold mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.orderItems.map((item) => (
                <div key={item.bicycle.title} className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border">
                    <Image
                      src={item.bicycle.images[0] || '/placeholder.svg'}
                      alt={item.bicycle.title}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium">
                      <h4>{item.bicycle.title}</h4>
                      <p>${item.bicycle.price.toFixed(2)}</p>
                    </div>
	                    <div className="flex items-end justify-between text-sm">
	                      <p className="text-muted-foreground">Quantity: {item.quantity}</p>
	                      <p className="font-medium">
	                        ${(item.quantity * item.bicycle.price).toFixed(2)}
	                      </p>
	                    </div>
	                    {item.color && (
	                      <p className="text-sm text-muted-foreground">
	                        Color: {item.color}
	                      </p>
	                    )}
	                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
	            <div className="flex justify-between text-sm">
	              <p>Total Items</p>
	              <p>{totalItems}</p>
	            </div>
	            <div className="flex justify-between text-sm">
	              <p>Shipping ({order.shippingMethod})</p>
	              <p>${order.shippingCost.toFixed(2)}</p>
	            </div>
	            <div className="flex justify-between font-semibold">
              <p>Total Amount</p>
              <p>${totalAmount.toFixed(2)}</p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            Ordered on {order.createdAt.toLocaleDateString()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 
