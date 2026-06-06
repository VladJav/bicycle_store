'use client';

import { Button } from '@src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { deleteBicycle } from '@src/actions/bicycle';
import { Bicycle, Review, OrderItem } from '@generated/prisma';
import DropdownEditAction from '@src/components/DropdownEditAction/DropdownEditAction';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface ProductActionsProps {
  product: Bicycle & {
    reviews: Review[];
    orderItems?: OrderItem[];
  };
}

export function ProductActions({ product }: ProductActionsProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEditSelect = () => {
    setDropdownOpen(false);
    window.setTimeout(() => setOpen(true), 0);
  };

  const handleDeleteSelect = async () => {
    try {
      await deleteBicycle(product.id);
      router.refresh();
    } catch (error) {
      toast('Product not deleted', {
        description:
          error instanceof Error ? error.message : 'Unable to delete product',
      });
    }
  };

  return (
    <>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup='true' size='icon' variant='ghost'>
            <MoreHorizontal className='h-4 w-4' />
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onSelect={handleEditSelect}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className='text-destructive'
            onSelect={() => {
              void handleDeleteSelect();
            }}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownEditAction product={product} open={open} setOpen={setOpen} />
    </>
  );
}
