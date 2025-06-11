import Image from 'next/image';
import { TableCell, TableRow } from '@src/components/ui/table';
import { Bicycle, Review, OrderItem } from '@generated/prisma';
import { ProductActions } from '@src/components/ProductActions/ProductActions';

interface ProductProps {
  product: Bicycle & {
    reviews: Review[];
    orderItems: OrderItem[];
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
        {product.orderItems.length}
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {product.createdAt.toLocaleDateString('en-US')}
      </TableCell>
      <TableCell>
        {/* @ts-expect-error - TODO: fix this */}
        <ProductActions product={product} />
      </TableCell>
    </TableRow>
  );
}
