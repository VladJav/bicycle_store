import { Tabs, TabsContent, TabsList, TabsTrigger } from '@src/components/ui/tabs';
import { ProductsTable } from './products-table';
import { CreateProductModal } from '@src/components/CreateProductModal/CreateProductModal';
import { getAllBicycles, getBicyclesCount } from '@src/actions/bicycle';

export default async function ProductsPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const search = searchParams.q ?? '';
  const offset = Number(searchParams.offset) || 0;
  const where = {
    title: {
      contains: search,
      mode: 'insensitive' as const,
    },
  };
  const products = await getAllBicycles({
    where,
    include: {
      reviews: true,
      orderItems: true,
    },
    take: 5,
    skip: offset,
  });
  const newOffset = Number(offset) + products.length;
  const totalProducts = await getBicyclesCount({ where });

  return (
    <Tabs defaultValue="all">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="draft">Draft</TabsTrigger>
          <TabsTrigger value="archived" className="hidden sm:flex">
            Archived
          </TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <CreateProductModal />
        </div>
      </div>
      <TabsContent value="all">
	        <ProductsTable
	          products={products}
          offset={newOffset ?? 0}
          totalProducts={totalProducts}
        />
      </TabsContent>
    </Tabs>
  );
}
