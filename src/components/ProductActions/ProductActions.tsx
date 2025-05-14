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
import { Bicycle, Review, Order } from '@generated/prisma';
import DropdownEditAction from '@src/components/DropdownEditAction/DropdownEditAction';
import { useState } from 'react';

interface ProductActionsProps {
  product: Bicycle & {
    reviews: Review[];
    orders: Order[];
  };
}

export function ProductActions({ product }: ProductActionsProps) {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEditClick = () => {
    setOpen(true);
    setDropdownOpen(false);
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
          <DropdownMenuItem>
            <button onClick={handleEditClick}>Edit</button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <form action={() => deleteBicycle(product.id)}>
              <button type='submit'>Delete</button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownEditAction product={product} open={open} setOpen={setOpen} />
    </>
  );
} 