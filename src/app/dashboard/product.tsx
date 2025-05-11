import Image from 'next/image';
import { Badge } from '@src/components/ui/badge';
import { Button } from '@src/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@src/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { TableCell, TableRow } from '@src/components/ui/table';
import { deleteProduct } from './actions';
import { Bicycle, Review, Order } from '@generated/prisma';

interface ProductProps {
  product: Bicycle & {
    reviews: Review[];
    orders: Order[];
  };
}

export function Product({ product }: ProductProps) {
  return (
    <TableRow>
      <TableCell className="hidden sm:table-cell">
        <Image
          alt="Product image"
          className="aspect-square rounded-md object-cover"
          height="64"
          src={product.images[0]}
          width="64"
          unoptimized={true}
        />
      </TableCell>
      <TableCell className="font-medium">{product.title}</TableCell>
      <TableCell>{product.reviews.length}</TableCell>
      <TableCell className="hidden md:table-cell">{`$${product.price}`}</TableCell>
      <TableCell className="hidden md:table-cell">
        {product.orders.length}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {product.createdAt.toLocaleDateString('en-US')}
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>
              <form action={deleteProduct}>
                <button type="submit">Delete</button>
              </form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
