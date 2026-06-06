'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from '@src/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@src/components/ui/card';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import { Button } from '@src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { OrderDetailsModal } from '@src/components/OrderDetailsModal/OrderDetailsModal';
import { UpdateStatusModal } from '@src/components/UpdateStatusModal/UpdateStatusModal';
import { useState } from 'react';
import { Status } from '@generated/prisma';

type Order = {
	  id: string;
	  address: string;
	  shippingMethod: string;
	  shippingCost: number;
	  total: number;
	  createdAt: Date;
  status: {
    id: string;
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

interface OrderTableProps {
  orders: Order[];
  offset: number;
  totalOrders: number;
  statuses: Status[];
}

export function OrdersTable({
  orders,
  offset,
  totalOrders,
  statuses,
}: OrderTableProps) {
  const router = useRouter();
  const ordersPerPage = 5;
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdateOrder, setStatusUpdateOrder] = useState<Order | null>(
    null
  );

  const openModalAfterMenuClose = (openModal: () => void) => {
    window.setTimeout(openModal, 0);
  };

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/dashboard/orders?offset=${offset + ordersPerPage}`, {
      scroll: false,
    });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            View and manage your customer orders.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Items</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{order.user.name || 'Anonymous'}</span>
                      <span className="text-sm text-muted-foreground">
                        {order.user.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.status.title}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.orderItems.reduce(
                      (acc, item) => acc + item.quantity,
                      0
                    )}{' '}
                    items
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.createdAt.toDateString()}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onSelect={() =>
                            openModalAfterMenuClose(() =>
                              setSelectedOrder(order)
                            )
                          }
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() =>
                            openModalAfterMenuClose(() =>
                              setStatusUpdateOrder(order)
                            )
                          }
                        >
                          Update Status
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <form className="flex items-center w-full justify-between">
            <div className="text-xs text-muted-foreground">
              Showing{' '}
              <strong>
                {Math.max(0, Math.min(offset - ordersPerPage, totalOrders) + 1)}
                -{offset}
              </strong>{' '}
              of <strong>{totalOrders}</strong> orders
            </div>
            <div className="flex">
              <Button
                formAction={prevPage}
                variant="ghost"
                size="sm"
                type="submit"
                disabled={offset === ordersPerPage}
              >
                <ChevronLeft className="mr-2 h-4 w-4" />
                Prev
              </Button>
              <Button
                formAction={nextPage}
                variant="ghost"
                size="sm"
                type="submit"
                disabled={offset + ordersPerPage > totalOrders}
              >
                Next
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardFooter>
      </Card>

      {selectedOrder && (
        <OrderDetailsModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}

      {statusUpdateOrder && (
        <UpdateStatusModal
          isOpen={!!statusUpdateOrder}
          onClose={() => setStatusUpdateOrder(null)}
          orderId={statusUpdateOrder.id}
          currentStatus={statusUpdateOrder.status.title}
          statuses={statuses}
        />
      )}
    </>
  );
}
